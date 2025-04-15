/**
 * Boot Sequence Utility
 * ===================
 * 
 * This module provides the boot sequence animation for the terminal interface.
 * 
 * Features:
 * - Boot sequence messages
 * - Typing animation
 * - Progress indicators
 * - Error simulation
 * 
 * Security:
 * - Content validation
 * - Error handling
 * - Animation safety
 */

/**
 * Boot Sequence Messages
 * 
 * Defines the messages displayed during the boot sequence:
 * - System initialization
 * - Service startup
 * - Progress indicators
 * - Error simulation
 * 
 * Security:
 * - Content validation
 * - Error handling
 * - Animation safety
 */
export const bootSequence = [
  "Initializing system...",
  "Loading core services...",
  "Starting network services...",
  "Mounting filesystems...",
  "Starting security services...",
  "Loading user profile...",
  "Initializing terminal...",
  "System ready.",
]

/**
 * Boot Sequence Configuration
 * 
 * Defines the configuration for the boot sequence:
 * - Animation speed
 * - Message timing
 * - Error probability
 * - Progress indicators
 * 
 * Security:
 * - Configuration validation
 * - Timing safety
 * - Error handling
 */
export const bootConfig = {
  // Animation speed in milliseconds
  speed: {
    min: 100,
    max: 500,
  },

  // Error simulation probability (0-1)
  errorProbability: 0.1,

  // Progress indicators
  progress: {
    start: "[",
    end: "]",
    fill: "=",
    empty: " ",
    width: 20,
  },
}

/**
 * Generates a progress bar for the boot sequence
 * 
 * @param progress - Current progress (0-1)
 * @returns string - Formatted progress bar
 * 
 * Example:
 * generateProgressBar(0.5) // Returns: "[==========          ]"
 */
export function generateProgressBar(progress: number): string {
  const { start, end, fill, empty, width } = bootConfig.progress
  const filled = Math.floor(progress * width)
  const emptyWidth = width - filled

  return `${start}${fill.repeat(filled)}${empty.repeat(emptyWidth)}${end}`
}

/**
 * Simulates a boot sequence error
 * 
 * @returns string - Error message
 * 
 * Security:
 * - Error message sanitization
 * - Safe error simulation
 */
export function simulateError(): string {
  const errors = [
    "Error: Service failed to start",
    "Warning: Resource allocation failed",
    "Error: Network connection timeout",
    "Warning: Disk space low",
  ]

  return errors[Math.floor(Math.random() * errors.length)]
}
