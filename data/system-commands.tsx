/**
 * System Commands and Configuration
 * ==============================
 * 
 * This module defines the system commands and technical configurations
 * for the terminal CV. This file should not be modified by users.
 */

export interface SystemCommand {
  command: string
  shortcut: string
  description: string
  isSystem: boolean
}

export interface CustomCommand {
  command: string
  shortcut?: string
  description: string
  content: any
}

export const systemCommands: SystemCommand[] = [
  {
    command: "help",
    shortcut: "h",
    description: "Show available commands",
    isSystem: true
  },
  {
    command: "clear",
    shortcut: "cls",
    description: "Clear the terminal",
    isSystem: true
  },
  {
    command: "exit",
    shortcut: "q",
    description: "Exit the terminal",
    isSystem: true
  }
] 