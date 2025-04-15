"use client"

/**
 * Terminal Prompt Component
 * =======================
 * 
 * A terminal-style command input interface that provides:
 * - Command input and execution
 * - Command autocompletion
 * - Command validation
 * - Error handling and display
 * - Blinking cursor
 * - Keyboard navigation
 * - Focus management
 * 
 * Security Features:
 * - Input sanitization
 * - Command validation
 * - Error boundary handling
 * - Focus management for accessibility
 */

import { useState, useRef, useEffect } from "react"
import type { CommandType } from "@/lib/commands"
import { validateCommand, formatErrorMessage } from "@/lib/validation"
import { terminalAppearance } from "@/data/appearance"

/**
 * Props interface for TerminalPrompt component
 * 
 * @property onCommand - Callback function executed when a command is submitted
 * @property commands - List of available commands for autocompletion
 * @property promptText - Text displayed before the input area
 * @property textColor - Color for the prompt text
 * @property commandColor - Color for the command text
 * @property cursorColor - Color for the blinking cursor
 * @property cursorBlinkSpeed - Speed of cursor blinking in milliseconds
 * @property onFocus - Callback function executed when the input is focused
 */
interface TerminalPromptProps {
  /** Function to handle command execution */
  onCommand: (command: string) => void
  /** List of available commands for autocompletion */
  commands: CommandType[]
  /** Text to display before the input */
  promptText: string
  /** Color for the prompt text */
  textColor: string
  /** Color for the command text */
  commandColor: string
  /** Color for the cursor */
  cursorColor: string
  /** Speed of cursor blinking in milliseconds */
  cursorBlinkSpeed: number
  /** Function to handle focus events */
  onFocus: () => void
}

/**
 * Terminal Prompt Component
 * 
 * Features:
 * - Command input with validation
 * - Autocomplete suggestions
 * - Error handling and display
 * - Blinking cursor with configurable speed
 * - Keyboard navigation
 * - Focus management
 * 
 * State Management:
 * - input: Current command being typed
 * - cursorVisible: Controls cursor blinking
 * - currentMatchIndex: Tracks current autocomplete match
 * - matches: List of matching commands
 * - isCycling: Tracks if user is cycling through matches
 * - error: Stores any validation or execution errors
 */
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
  // State Management
  const [input, setInput] = useState("")
  const [cursorVisible, setCursorVisible] = useState(true)
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0)
  const [matches, setMatches] = useState<CommandType[]>([])
  const [isCycling, setIsCycling] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Focus Management
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus()
    }
  }, [])

  // Cursor Blinking Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, cursorBlinkSpeed)

    return () => clearInterval(interval)
  }, [cursorBlinkSpeed])

  // Command Matching
  useEffect(() => {
    if (isCycling) return

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

  /**
   * Handles command submission
   * 
   * Process:
   * 1. Validates the command
   * 2. Executes the command
   * 3. Resets state
   * 4. Handles errors
   * 
   * @param e - Form submission event
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      try {
        validateCommand(input)
        onCommand(input)
        setInput("")
        setMatches([])
        setCurrentMatchIndex(0)
        setIsCycling(false)
        setError(null)
      } catch (err) {
        if (err instanceof Error) {
          setError(formatErrorMessage(err))
        }
      }
    }
  }

  /**
   * Handles keyboard input
   * 
   * Features:
   * - Tab: Cycle through autocomplete matches
   * - Backspace: Remove last character
   * - Enter: Submit command
   * - Character input: Add to command
   * 
   * @param e - Keyboard event
   */
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
      setError(null)
    } else if (e.key === "Enter") {
      handleSubmit(e)
    } else if (e.key.length === 1) {
      setInput((prev) => prev + e.key)
      setError(null)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex items-center">
        {/* Prompt text */}
        <span style={{ color: textColor }}>{promptText}</span>
        
        {/* Input container */}
        <div
          ref={containerRef}
          className="flex-1 relative min-h-[1.5em] outline-none"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onFocus={onFocus}
        >
          {/* Command text */}
          <span style={{ color: commandColor }}>{input}</span>
          
          {/* Blinking cursor */}
          <span
            className={`absolute top-0 h-5 w-2 transition-opacity ${
              cursorVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundColor: cursorColor,
              left: `${input.length}ch`,
            }}
          />
        </div>
      </form>
      
      {/* Error message display */}
      {error && <div className="text-red-400 mt-1">{error}</div>}
    </div>
  )
}
