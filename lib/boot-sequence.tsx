import { bootMessages } from "@/data/appearance"

function getTimestamp() {
  const now = new Date()
  return `[${now.toLocaleTimeString()}]`
}

export const bootSequence = bootMessages.map((msg, index) => {
  const statusClass = msg.type === "ok" ? "text-green-300" : "text-yellow-300"
  const statusText = msg.type === "ok" ? "[ OK ]" : "[ WARN ]"

  return (
    <span key={`boot-${index + 1}`}>
      {getTimestamp()} <span className={statusClass}>{statusText}</span> {msg.message}
    </span>
  )
})
