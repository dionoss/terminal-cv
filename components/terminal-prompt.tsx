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
}

export default function TerminalPrompt({
  onCommand,
  commands,
  promptText,
  textColor,
  commandColor,
  cursorColor,
  cursorBlinkSpeed,
}: TerminalPromptProps) {
  const [input, setInput] = useState("")
  const [cursorVisible, setCursorVisible] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, cursorBlinkSpeed)

    return () => clearInterval(interval)
  }, [cursorBlinkSpeed])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onCommand(input)
      setInput("")
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex items-center">
        <span style={{ color: textColor }}>{promptText}</span>
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-transparent border-none outline-none font-mono caret-transparent"
            style={{ color: commandColor }}
            autoFocus
          />
          <span
            className={`absolute top-0 left-0 h-5 w-2 transition-opacity ${
              cursorVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{ 
              backgroundColor: cursorColor,
              transform: `translateX(${input.length}ch)`
            }}
          ></span>
        </div>
      </form>
    </div>
  )
}
