/**
 * HTML Parser Utility
 * =================
 * 
 * This module provides safe HTML parsing and rendering for the terminal interface.
 * 
 * Features:
 * - HTML string parsing
 * - Safe element creation
 * - Custom tag handling
 * - Error recovery
 * 
 * Security:
 * - Content sanitization
 * - Safe DOM manipulation
 * - Error handling
 */

import React from "react"
import DOMPurify from "dompurify"

/**
 * Allowed HTML Tags
 * 
 * Defines the HTML tags that are allowed in the terminal output:
 * - Basic text formatting
 * - Lists and tables
 * - Links and images
 * - Code blocks
 * 
 * Security:
 * - Tag whitelisting
 * - Attribute filtering
 * - Content sanitization
 */
const ALLOWED_TAGS = [
  "p", "div", "span", "strong", "em", "i", "b",
  "ul", "ol", "li", "table", "tr", "td", "th",
  "a", "img", "code", "pre", "br", "hr"
]

/**
 * Configuration for DOMPurify sanitization
 * 
 * Security Settings:
 * - ALLOWED_TAGS: Only specific HTML tags are allowed
 * - ALLOWED_ATTR: Only specific attributes are allowed
 * - ALLOW_DATA_ATTR: Prevents data-* attributes for security
 * 
 * Allowed Tags:
 * - p: Paragraphs
 * - strong: Bold text
 * - em: Emphasized text
 * - ul: Unordered lists
 * - li: List items
 * - div: Content containers
 * - span: Inline containers
 * 
 * Allowed Attributes:
 * - class: For styling
 * - style: For inline styles
 */
const sanitizeConfig = {
  ALLOWED_TAGS: ['p', 'strong', 'em', 'ul', 'li', 'div', 'span'],
  ALLOWED_ATTR: ['class', 'style'],
  ALLOW_DATA_ATTR: false
}

/**
 * Parse HTML Content
 * 
 * Converts an HTML string into React elements with proper sanitization:
 * - Sanitizes HTML content
 * - Creates React elements
 * - Handles errors gracefully
 * 
 * @param html - HTML string to parse
 * @returns React.ReactNode - Parsed React elements
 * 
 * Security:
 * - HTML sanitization
 * - Safe DOM manipulation
 * - Error handling
 * 
 * Example:
 * parseHtmlContent("<p>Hello <strong>World</strong></p>")
 */
export function parseHtmlContent(html: string): React.ReactNode {
  try {
    // Sanitize HTML content
    const sanitized = DOMPurify.sanitize(html, {
      ALLOWED_TAGS,
      ALLOWED_ATTR: ["href", "src", "alt", "title", "class", "style"],
      RETURN_DOM: true
    })

    // Convert DOM nodes to React elements
    return Array.from(sanitized.childNodes).map((node, index) => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent
      }

      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement
        const children = Array.from(element.childNodes).map(child => {
          if (child.nodeType === Node.TEXT_NODE) {
            return child.textContent
          }
          if (child.nodeType === Node.ELEMENT_NODE) {
            const childElement = child as HTMLElement
            return parseHtmlContent(childElement.outerHTML)
          }
          return null
        })

        return React.createElement(
          element.tagName.toLowerCase(),
          { key: index, ...element.attributes },
          ...children
        )
      }

      return null
    })
  } catch (error) {
    console.error("Error parsing HTML content:", error)
    return <span className="text-red-400">Error: Invalid HTML content</span>
  }
}

/**
 * Converts DOM nodes to React elements
 * 
 * @param node - The DOM node to convert
 * @returns React.ReactNode - The converted React element
 * 
 * Process:
 * 1. Handle text nodes
 * 2. Handle element nodes
 * 3. Convert attributes to props
 * 4. Apply Tailwind classes
 * 5. Create React elements
 * 
 * @example
 * convertNodeToReact(document.createElement('p'))
 * // Returns: React element representing the paragraph
 */
function convertNodeToReact(node: Node): React.ReactNode {
  // If it's a text node, just return the text content
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent
  }

  // If it's not an element node, return null
  if (node.nodeType !== Node.ELEMENT_NODE) {
    return null
  }

  const element = node as Element
  const tagName = element.tagName.toLowerCase()
  const children: React.ReactNode[] = []

  // Convert all child nodes to React elements
  element.childNodes.forEach((childNode) => {
    const child = convertNodeToReact(childNode)
    if (child !== null) {
      children.push(child)
    }
  })

  // Map HTML attributes to React props
  const props: Record<string, string> = {}
  element.getAttributeNames().forEach((attrName) => {
    // Convert attribute names to camelCase for React
    const reactAttrName = attrName === "class" ? "className" : attrName
    props[reactAttrName] = element.getAttribute(attrName) || ""
  })

  // Apply Tailwind classes based on HTML tags
  let className = props.className || ""

  switch (tagName) {
    case "p":
      className += " mb-2" // Add margin bottom to paragraphs
      break
    case "strong":
      className += " text-green-300 font-bold" // Style for bold text
      break
    case "em":
      className += " text-yellow-400" // Style for emphasized text
      break
    case "ul":
      className += " list-disc list-inside space-y-1" // Style for unordered lists
      break
    case "div":
      if (!className.includes("space-y")) {
        className += " space-y-2" // Add vertical spacing to divs
      }
      break
  }

  if (className) {
    props.className = className.trim()
  }

  // Create the React element with a unique key
  return React.createElement(tagName, { key: Math.random(), ...props }, ...children)
}
