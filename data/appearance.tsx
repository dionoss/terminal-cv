// APPEARANCE CUSTOMIZATION
// -----------------------
// Edit this file to change the look and feel of your terminal CV
// You don't need to understand code - just change the values between quotes or numbers

export const terminalAppearance = {
  // COLORS
  // ------
  // Use color names or hex codes (#RRGGBB)
  colors: {
    // Background colors
    background: "black", // Terminal background color
    terminalBorder: "#22c55e4d", // Border color (default: light green with transparency)

    // Text colors
    defaultText: "#22c55e", // Default text color (green)
    highlightText: "#22c55e", // Highlighted text (bright green)
    headingText: "#22c55e", // Heading text color

    // Command prompt colors
    promptText: "#22c55e", // Command prompt text color
    commandText: "#22c55e", // Color of commands you type

    // Section colors
    sectionHeadings: "#22c55e", // Section headings (e.g., "Personal Information:")
    sectionSubheadings: "#eab308", // Section subheadings (e.g., "Programming:")

    // Link and button colors
    linkText: "#eab308", // Color of clickable links/commands
    linkHoverText: "#fef08a", // Color when hovering over links

    // Status colors
    errorText: "#ef4444", // Error message color
    warningText: "#eab308", // Warning message color
    successText: "#22c55e", // Success message color
  },

  // TERMINAL SETTINGS
  // ----------------
  terminal: {
    prompt: "user@portfolio:~$ ", // The text shown before each command
    cursorBlinkSpeed: 500, // Cursor blink speed in milliseconds (lower = faster)
    typingSpeed: {
      min: 50, // Minimum time between typed characters (milliseconds)
      max: 100, // Maximum time between typed characters (milliseconds)
    },
    bootSequenceSpeed: {
      min: 200, // Minimum time between boot messages (milliseconds)
      max: 300, // Maximum time between boot messages (milliseconds)
    },
    showGlowEffect: true, // Whether to show the green glow effect
    roundedCorners: true, // Whether to show rounded corners
    scrollbarVisible: true, // Whether to show the scrollbar
  },

  // BOOT SEQUENCE
  // ------------
  // Set to false to skip the boot sequence and go straight to the login
  showBootSequence: true,

  // LOGIN SEQUENCE
  // -------------
  // Set to false to skip the login sequence and go straight to the terminal
  showLoginSequence: true,
  login: {
    username: "user", // The username shown during login
    passwordMask: "••••", // The character used to mask the password
  },
}

// BOOT SEQUENCE MESSAGES
// ---------------------
// These are the messages shown during the boot sequence
// You can add, remove, or modify these messages
export const bootMessages = [
  { type: "ok", message: "Initializing system..." },
  { type: "ok", message: "Loading kernel modules..." },
  { type: "ok", message: "Starting network manager..." },
  { type: "warn", message: "Network security scan detected 3 potential vulnerabilities" },
  { type: "ok", message: "Applying security patches..." },
  { type: "ok", message: "Starting system services..." },
  { type: "ok", message: "Loading CV modules..." },
  { type: "ok", message: "System ready" },
]

// ADVANCED SETTINGS (be careful when editing these)
// -------------------------------------------------
export const advancedSettings = {
  // Font settings
  fontFamily: "'Courier New', monospace", // Terminal font
  fontSize: "1rem", // Base font size

  // Animation settings
  useTypingAnimation: true, // Whether to animate typing for clicked commands
  simulateTypingForUserCommands: false, // Whether to simulate typing for user-typed commands (set to false)

  // Terminal dimensions
  terminalHeight: "85vh", // Height on mobile
  terminalHeightDesktop: "80vh", // Height on desktop
  terminalMaxWidth: "4xl", // Maximum width (Tailwind size)
}
