/**
 * HTML Parser Component
 * ===================
 * 
 * A React component that safely renders HTML content from custom commands.
 * 
 * Features:
 * - HTML sanitization using DOMPurify
 * - Custom tag and attribute whitelisting
 * - Tailwind CSS class application
 * - React element conversion
 * 
 * Security Features:
 * - Input sanitization
 * - Tag whitelisting
 * - Attribute filtering
 * - XSS prevention
 */

"use client"

import React from "react"
import { parseHtmlContent } from "@/lib/html-parser"

/**
 * Props interface for HtmlParser component
 * 
 * @property htmlString - The HTML string to parse and render
 * @property className - Optional CSS classes to apply to the container
 */
interface HtmlParserProps {
  htmlString: string
  className?: string
}

/**
 * HtmlParser Component
 * 
 * This component safely renders HTML content by:
 * 1. Sanitizing the input HTML
 * 2. Converting it to React elements
 * 3. Applying appropriate styling
 * 
 * Security:
 * - Uses DOMPurify for sanitization
 * - Whitelists specific tags and attributes
 * - Prevents XSS attacks
 * - Filters out dangerous content
 * 
 * Styling:
 * - Applies Tailwind CSS classes
 * - Maintains consistent spacing
 * - Preserves semantic structure
 */
export default function HtmlParser({ htmlString, className = "" }: HtmlParserProps) {
  const content = parseHtmlContent(htmlString)

  return (
    <div className={className}>
      {content}
    </div>
  )
}
