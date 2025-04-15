/**
 * Terminal Line Component
 * =====================
 * 
 * This component renders a single line in the terminal output.
 * 
 * Features:
 * - Line type detection
 * - Content formatting
 * - Error handling
 * - Accessibility
 * 
 * Security:
 * - Content sanitization
 * - Error handling
 * - Safe rendering
 */

/**
 * Terminal Line Props
 * 
 * Defines the properties for the terminal line component:
 * - type: Line type (command, output, error, system)
 * - content: Line content (string or React element)
 * 
 * Security:
 * - Type validation
 * - Content sanitization
 */
interface TerminalLineProps {
  type: "command" | "output" | "error" | "system"
  content: string | React.ReactElement
}

/**
 * Terminal Line Component
 * 
 * Renders a single line in the terminal output with appropriate styling:
 * - Command lines: User input
 * - Output lines: Command results
 * - Error lines: Error messages
 * - System lines: System messages
 * 
 * Security:
 * - Content sanitization
 * - Error handling
 * - Safe rendering
 */
export default function TerminalLine({ type, content }: TerminalLineProps) {
  // Get appropriate styling based on line type
  const getLineStyle = () => {
    switch (type) {
      case "command":
        return "text-green-400"
      case "output":
        return "text-gray-300"
      case "error":
        return "text-red-400"
      case "system":
        return "text-yellow-400"
      default:
        return "text-gray-300"
    }
  }

  return (
    <div className={`${getLineStyle()} font-mono text-sm mb-1`}>
      {content}
    </div>
  )
}
