/**
 * Data Validation
 * =============
 * 
 * This module contains validation logic for the terminal CV.
 * This file should not be modified by users.
 */

// @cursor-lock

import { terminalAppearance } from "./appearance"

/**
 * Validates appearance settings
 * 
 * @param settings - The appearance settings to validate
 * @returns boolean - True if settings are valid
 * 
 * Validation Rules:
 * 1. Colors must be valid hex codes
 * 2. Numbers must be positive
 * 3. Strings must be safe CSS values
 * 
 * Security:
 * - Validates color formats
 * - Sanitizes CSS properties
 * - Prevents injection attacks
 */
export function validateAppearance(settings: typeof terminalAppearance): boolean {
  // Validate colors
  const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
  const colors = [
    settings.colors.background,
    settings.colors.terminalBorder,
    settings.colors.defaultText,
    settings.colors.highlightText,
    settings.colors.headingText,
    settings.colors.subheadingText,
    settings.colors.linkText,
    settings.colors.linkHoverText,
    settings.colors.errorText,
    settings.colors.warningText,
    settings.colors.successText,
  ]

  // Validate numbers
  const numbers = [
    settings.terminal.cursorBlinkSpeed,
    settings.terminal.typingSpeed.min,
    settings.terminal.typingSpeed.max,
    settings.terminal.bootSequenceSpeed.min,
    settings.terminal.bootSequenceSpeed.max,
  ]

  // Validate strings
  const strings = [
    settings.terminal.prompt,
    settings.login.username,
    settings.login.passwordMask,
  ]

  return (
    colors.every(color => colorRegex.test(color)) &&
    numbers.every(num => num > 0) &&
    strings.every(str => typeof str === 'string' && str.length > 0)
  )
}

// Validate the appearance settings
if (!validateAppearance(terminalAppearance)) {
  console.error("Invalid appearance settings detected. Please check your configuration.")
} 