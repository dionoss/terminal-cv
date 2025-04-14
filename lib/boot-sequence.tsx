import { bootMessages } from "@/data/appearance"
import { terminalAppearance } from "@/data/appearance"

function getTimestamp() {
  const now = new Date()
  return `[${now.toLocaleTimeString()}]`
}

export const bootSequence = bootMessages.map((msg, index) => {
  if (msg.type === "ok") {
    return (
      <span key={`boot-${index + 1}`}>
        {getTimestamp()} <span style={{ color: terminalAppearance.colors.successText }}>[ OK ]</span> {msg.message}
      </span>
    )
  } else {
    return (
      <span key={`boot-${index + 1}`}>
        {getTimestamp()} <span style={{ color: terminalAppearance.colors.warningText }}>[WARN]</span> {msg.message}
      </span>
    )
  }
})
