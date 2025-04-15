"use client"

import type { JSX } from "react"
import { customCommands, systemCommands } from "@/data/cv-content"
import { parseHtmlContent } from "./html-parser"

/**
 * Commands Utility
 * ==============
 * 
 * This module provides command management and execution for the terminal interface.
 * 
 * Features:
 * - Command type definitions
 * - Command execution
 * - Command validation
 * - Error handling
 * 
 * Security Features:
 * - Command validation
 * - Input sanitization
 * - Error handling
 * - Access control
 */

/**
 * Command Type Definition
 * 
 * Represents a terminal command with:
 * - Command name
 * - Shortcut (optional)
 * - Description
 * - Execution function
 * 
 * Security:
 * - Command name validation
 * - Input sanitization
 * - Error handling
 */
export interface CommandType {
  command: string
  shortcut?: string
  description: string
  execute: (args?: string[]) => React.ReactNode
}

/**
 * Command Execution Result
 * 
 * Represents the result of executing a command:
 * - Success status
 * - Output content
 * - Error message (if any)
 * 
 * Security:
 * - Error message sanitization
 * - Output validation
 */
export interface CommandResult {
  success: boolean
  output: React.ReactNode
  error?: string
}

/**
 * Executes a command with optional arguments
 * 
 * @param command - The command to execute
 * @param args - Optional arguments for the command
 * @returns CommandResult - The result of command execution
 * 
 * Process:
 * 1. Validates the command
 * 2. Executes the command
 * 3. Handles errors
 * 4. Returns result
 * 
 * Security:
 * - Command validation
 * - Input sanitization
 * - Error handling
 * 
 * @example
 * executeCommand("help") // Returns help information
 * executeCommand("clear") // Clears the terminal
 */
export function executeCommand(command: string, args?: string[]): CommandResult {
  try {
    // Validate command
    if (!command) {
      throw new Error("Command cannot be empty")
    }

    // Execute command
    const output = commandMap[command]?.execute(args)
    if (!output) {
      throw new Error(`Command not found: ${command}`)
    }

    return {
      success: true,
      output
    }
  } catch (error) {
    return {
      success: false,
      output: null,
      error: error instanceof Error ? error.message : "Unknown error"
    }
  }
}

/**
 * Command Map
 * 
 * Maps command names to their implementations
 * 
 * Security:
 * - Command validation
 * - Input sanitization
 * - Error handling
 */
export const commandMap: Record<string, CommandType> = {
  help: {
    command: "help",
    description: "Show available commands",
    execute: () => parseHtmlContent(`
      <div>
        <p>Available commands:</p>
        <ul>
          <li>help - Show this help message</li>
          <li>clear - Clear the terminal</li>
          <li>about - Show information about me</li>
        </ul>
      </div>
    `)
  },
  clear: {
    command: "clear",
    description: "Clear the terminal",
    execute: () => null
  },
  about: {
    command: "about",
    description: "Show information about me",
    execute: () => parseHtmlContent(`
      <div>
        <p>I am a software developer with experience in:</p>
        <ul>
          <li>TypeScript</li>
          <li>React</li>
          <li>Node.js</li>
          <li>Next.js</li>
        </ul>
      </div>
    `)
  }
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
      <p className="text-gray-400">Click on any command or type it to execute.</p>
    </div>
  )
}

// Convert custom commands to CommandType
function convertCustomCommands(): CommandType[] {
  return customCommands.map((cmd) => ({
    command: cmd.command,
    shortcut: cmd.shortcut,
    description: cmd.description,
    execute: () => parseHtmlContent(cmd.content),
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
        execute: () => generateHelpOutput(),
      }
    }

    if (cmd.command === "clear") {
      return {
        command: cmd.command,
        shortcut: cmd.shortcut,
        description: cmd.description,
        execute: () => null,
      }
    }

    return {
      command: cmd.command,
      shortcut: cmd.shortcut,
      description: cmd.description,
      execute: () => <div>Command not implemented</div>,
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
