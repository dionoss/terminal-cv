"use client"

import type { JSX } from "react"
import { customCommands, systemCommands } from "@/data/cv-content"
import { parseHtmlContent } from "./html-parser"

export interface CommandType {
  command: string
  shortcut?: string
  description: string
  output: JSX.Element
}

// Function to generate the help command output
function generateHelpOutput(): JSX.Element {
  const allCommands = [...customCommands, ...systemCommands]

  return (
    <div className="space-y-2">
      <p className="text-green-300 font-bold">Available Commands:</p>
      <ul className="list-disc list-inside">
        {allCommands.map((cmd, index) => (
          <li key={index}>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("terminal-command", { detail: cmd.command }))}
              className="text-yellow-400 hover:text-yellow-200 hover:underline cursor-pointer"
            >
              {cmd.command}
            </button>
            {cmd.shortcut && <span className="text-gray-400"> ({cmd.shortcut})</span>} - {cmd.description}
          </li>
        ))}
      </ul>
      <p>Click on any command or type it to execute.</p>
    </div>
  )
}

// Convert custom commands to CommandType
function convertCustomCommands(): CommandType[] {
  return customCommands.map((cmd) => ({
    command: cmd.command,
    shortcut: cmd.shortcut,
    description: cmd.description,
    output: (
      <div className="space-y-2">
        {typeof window !== "undefined" ? parseHtmlContent(cmd.content) : <div>Loading...</div>}
      </div>
    ),
  }))
}

// Generate system commands
function generateSystemCommands(): CommandType[] {
  return systemCommands.map((cmd) => {
    if (cmd.command === "help") {
      return {
        command: cmd.command,
        shortcut: cmd.shortcut,
        description: cmd.description,
        output: generateHelpOutput(),
      }
    }

    if (cmd.command === "clear") {
      return {
        command: cmd.command,
        shortcut: cmd.shortcut,
        description: cmd.description,
        output: <div className="hidden"></div>,
      }
    }

    return {
      command: cmd.command,
      shortcut: cmd.shortcut,
      description: cmd.description,
      output: <div>Command not implemented</div>,
    }
  })
}

// Generate all commands
export function generateCommands(): CommandType[] {
  if (typeof window === "undefined") {
    // Return empty array during server-side rendering
    return []
  }

  const customCmds = convertCustomCommands()
  const systemCmds = generateSystemCommands()

  return [...customCmds, ...systemCmds]
}

// Export the commands
export const commands = typeof window !== "undefined" ? generateCommands() : []
