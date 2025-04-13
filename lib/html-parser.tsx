import React from "react"

// This function converts HTML strings from custom commands into React elements
export function parseHtmlContent(htmlString: string): React.ReactNode {
  // Create a temporary div to parse the HTML
  const tempDiv = document.createElement("div")
  tempDiv.innerHTML = htmlString.trim()

  // Convert the HTML nodes to React elements
  return convertNodeToReact(tempDiv)
}

// Helper function to convert DOM nodes to React elements
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
      className += " mb-2"
      break
    case "strong":
      className += " text-green-300 font-bold"
      break
    case "em":
      className += " text-yellow-400"
      break
    case "ul":
      className += " list-disc list-inside space-y-1"
      break
    case "div":
      if (!className.includes("space-y")) {
        className += " space-y-2"
      }
      break
  }

  if (className) {
    props.className = className.trim()
  }

  // Create the React element
  return React.createElement(tagName, { key: Math.random(), ...props }, ...children)
}
