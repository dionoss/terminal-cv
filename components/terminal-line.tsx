import type React from "react"
import type { ReactNode } from "react"
import { terminalAppearance } from "@/data/appearance"

interface TerminalLineProps {
  type: string
  content: string | ReactNode
}

export default function TerminalLine({ type, content }: TerminalLineProps) {
  const getPrefix = () => {
    switch (type) {
      case "boot":
        return null
      case "command":
        return <span style={{ color: terminalAppearance.colors.promptText }}>{terminalAppearance.terminal.prompt}</span>
      case "system":
        return null
      case "error":
        return <span style={{ color: terminalAppearance.colors.errorText }}>[ERROR] </span>
      default:
        return null
    }
  }

  const getStyles = () => {
    const styles: React.CSSProperties = { marginBottom: "0.25rem" }

    switch (type) {
      case "boot":
        styles.color = terminalAppearance.colors.defaultText
        break
      case "command":
        styles.color = terminalAppearance.colors.commandText
        break
      case "system":
        styles.color = terminalAppearance.colors.defaultText
        break
      case "error":
        styles.color = terminalAppearance.colors.errorText
        break
      case "output":
        styles.color = terminalAppearance.colors.defaultText
        styles.paddingLeft = "1rem"
        break
      default:
        styles.color = terminalAppearance.colors.defaultText
    }

    return styles
  }

  return (
    <div style={getStyles()}>
      {getPrefix()}
      {content}
    </div>
  )
}
