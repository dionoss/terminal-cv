/**
 * Help Button Component
 * ===================
 * 
 * A reusable button component that triggers the help command.
 * 
 * Features:
 * - Clickable button
 * - Custom styling
 * - Event handling
 * 
 * Security:
 * - Safe HTML content
 * - Event validation
 */

export const helpButton = `<button onclick="window.dispatchEvent(new CustomEvent('terminal-command', { detail: 'help' }))" class="text-blue-400 hover:text-blue-300 cursor-pointer underline">help</button>` 