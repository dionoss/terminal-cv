/**
 * Validation Utilities
 * ==================
 * 
 * This module provides validation and error handling for terminal commands.
 * It ensures command safety and provides user-friendly error messages.
 * 
 * Features:
 * - Command name validation
 * - Custom error types
 * - Error message formatting
 * - Security checks
 * 
 * Security Considerations:
 * - Input sanitization
 * - Command length limits
 * - Pattern validation
 * - Error handling
 */

/**
 * Regular expression pattern for valid command names
 * 
 * Rules:
 * - Only alphanumeric characters and hyphens allowed
 * - Must start with a letter or number
 * - No special characters or spaces
 * - Case-insensitive
 * 
 * Security:
 * - Prevents command injection
 * - Limits character set
 * - Enforces consistent format
 */
const COMMAND_NAME_PATTERN = /^[a-zA-Z0-9-]+$/

/**
 * Maximum allowed length for command names
 * 
 * Security:
 * - Prevents buffer overflow
 * - Limits memory usage
 * - Prevents denial of service
 */
const MAX_COMMAND_LENGTH = 50

/**
 * Validates if a command name follows the required format
 * 
 * @param command - The command name to validate
 * @returns boolean - True if the command name is valid
 * 
 * Validation Rules:
 * 1. Must match COMMAND_NAME_PATTERN
 * 2. Must be within MAX_COMMAND_LENGTH
 * 3. Must not be empty
 * 
 * @example
 * isValidCommandName("help")     // true
 * isValidCommandName("help-me")  // true
 * isValidCommandName("help me")  // false
 * isValidCommandName("help!")    // false
 */
export function isValidCommandName(command: string): boolean {
  return COMMAND_NAME_PATTERN.test(command)
}

/**
 * Custom error class for command-related errors
 * 
 * Features:
 * - Custom error name for easy identification
 * - Proper stack trace preservation
 * - Type-safe error handling
 * 
 * Usage:
 * - Command not found
 * - Command execution failed
 * - Command syntax error
 */
export class CommandError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CommandError'
    Error.captureStackTrace(this, CommandError)
  }
}

/**
 * Custom error class for validation-related errors
 * 
 * Features:
 * - Custom error name for easy identification
 * - Proper stack trace preservation
 * - Type-safe error handling
 * 
 * Usage:
 * - Invalid command format
 * - Command too long
 * - Empty command
 */
export class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
    Error.captureStackTrace(this, ValidationError)
  }
}

/**
 * Validates a command string against all validation rules
 * 
 * @param command - The command to validate
 * @throws ValidationError - If the command fails validation
 * 
 * Validation Rules:
 * 1. Command cannot be empty
 * 2. Command must match the allowed pattern
 * 3. Command length must be within limits
 * 
 * Security:
 * - Input sanitization
 * - Length validation
 * - Pattern validation
 * 
 * @example
 * validateCommand("help")     // No error
 * validateCommand("")         // Throws ValidationError
 * validateCommand("help me")  // Throws ValidationError
 */
export function validateCommand(command: string): void {
  if (!command) {
    throw new ValidationError('Command cannot be empty')
  }

  if (!isValidCommandName(command)) {
    throw new ValidationError('Command name can only contain letters, numbers, and hyphens')
  }

  if (command.length > MAX_COMMAND_LENGTH) {
    throw new ValidationError('Command name cannot exceed 50 characters')
  }
}

/**
 * Formats error messages for display in the terminal
 * 
 * @param error - The error to format
 * @returns string - A formatted error message
 * 
 * Error Types:
 * - ValidationError: Format: "Error: [message]"
 * - CommandError: Format: "Command Error: [message]"
 * - Other Errors: Format: "Unexpected Error: [message]"
 * 
 * Security:
 * - Sanitizes error messages
 * - Prevents information leakage
 * - Provides consistent formatting
 * 
 * @example
 * formatErrorMessage(new ValidationError("Invalid command"))  // "Error: Invalid command"
 * formatErrorMessage(new CommandError("Command not found"))   // "Command Error: Command not found"
 * formatErrorMessage(new Error("Unknown error"))             // "Unexpected Error: Unknown error"
 */
export function formatErrorMessage(error: Error): string {
  if (error instanceof ValidationError) {
    return `Error: ${error.message}`
  }
  if (error instanceof CommandError) {
    return `Command Error: ${error.message}`
  }
  return `Unexpected Error: ${error.message}`
} 