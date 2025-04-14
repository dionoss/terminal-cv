"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import type { CommandType } from "@/lib/commands"

interface TerminalPromptProps {
  onCommand: (command: string) => void
  commands: CommandType[]
  promptText: string
  textColor: string
  commandColor: string
  cursorColor: string
  cursorBlinkSpeed: number
  onFocus: () => void
}

export default function TerminalPrompt({
  onCommand,
  commands,
  promptText,
  textColor,
  commandColor,
  cursorColor,
  cursorBlinkSpeed,
  onFocus,
}: TerminalPromptProps) {
  const [input, setInput] = useState("")
  const [cursorVisible, setCursorVisible] = useState(true)
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0)
  const [matches, setMatches] = useState<CommandType[]>([])
  const [isCycling, setIsCycling] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Focus container when component mounts
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus()
    }
  }, [])

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, cursorBlinkSpeed)

    return () => clearInterval(interval)
  }, [cursorBlinkSpeed])

  // Update matches when input changes
  useEffect(() => {
    if (isCycling) return // Don't update matches while cycling

    if (input.trim()) {
      const newMatches = commands.filter(
        (cmd) =>
          cmd.command.toLowerCase().startsWith(input.toLowerCase()) ||
          (cmd.shortcut && cmd.shortcut.toLowerCase().startsWith(input.toLowerCase()))
      )
      setMatches(newMatches)
      setCurrentMatchIndex(0)
    } else {
      setMatches([])
      setCurrentMatchIndex(0)
    }
  }, [input, commands, isCycling])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onCommand(input)
      setInput("")
      setMatches([])
      setCurrentMatchIndex(0)
      setIsCycling(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Tab" && matches.length > 0) {
      e.preventDefault()
      setIsCycling(true)
      const nextIndex = (currentMatchIndex + 1) % matches.length
      setCurrentMatchIndex(nextIndex)
      setInput(matches[nextIndex].command)
    } else if (e.key === "Backspace") {
      e.preventDefault()
      setInput((prev) => prev.slice(0, -1))
    } else if (e.key === "Enter") {
      handleSubmit(e)
    } else if (e.key.length === 1) {
      setInput((prev) => prev + e.key)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex items-center">
        <span style={{ color: textColor }}>{promptText}</span>
        <div 
          ref={containerRef}
          className="flex-1 relative min-h-[1.5em] outline-none"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onFocus={onFocus}
        >
          <span style={{ color: commandColor }}>{input}</span>
          <span
            className={`absolute top-0 h-5 w-2 transition-opacity ${
              cursorVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{ 
              backgroundColor: cursorColor,
              left: `${input.length}ch`
            }}
          ></span>
        </div>
      </form>
    </div>
  )
}
