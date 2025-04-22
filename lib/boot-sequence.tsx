import { terminalAppearance } from "@/data/appearance"

function getTimestamp() {
  const now = new Date()
  return `[${now.toLocaleTimeString()}]`
}

export const bootSequence = terminalAppearance.boot.messages.map((msg, index) => {
  const statusColor = msg.type === "ok" 
    ? terminalAppearance.colors.successText 
    : terminalAppearance.colors.warningText
  const statusText = msg.type === "ok" ? "[ OK ]" : "[ WARN ]"

  return (
    <span key={`boot-${index + 1}`} style={{ color: terminalAppearance.colors.defaultText }}>
      {getTimestamp()}{" "}
      <span style={{ color: statusColor }}>{statusText}</span>{" "}
      {msg.message}
    </span>
  )
})
