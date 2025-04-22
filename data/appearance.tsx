// APPEARANCE CUSTOMIZATION
// -----------------------
// Edit this file to change the look and feel of your terminal CV

export const terminalAppearance = {
  // TERMINAL LAYOUT
  // --------------
  layout: {
    // Dimensions
    height: {
      mobile: "85vh",
      desktop: "80vh",
    },
    maxWidth: "4xl",
    roundedCorners: true,
    showGlowEffect: true,
    showScrollbar: true,
  },

  // TYPOGRAPHY
  // ---------
  typography: {
    fontFamily: "'Courier New', monospace",
    fontSize: "1rem",
    lineHeight: "1.5",
    letterSpacing: "normal",
  },

  // COLORS
  // ------
  colors: {
    // Background
    background: "black",
    terminalBorder: "#22c55e4d",

    // Text
    defaultText: "#22c55e",
    highlightText: "#22c55e",
    headingText: "#22c55e",

    // Command Interface
    promptText: "#22c55e",
    commandText: "#22c55e",
    cursorColor: "#22c55e",

    // Status Messages
    successText: "#22c55e",
    warningText: "#eab308",
    errorText: "#ef4444",

    // Interactive Elements
    linkText: "#eab308",
    linkHoverText: "#fef08a",
  },

  // COMMAND INTERFACE
  // ---------------
  terminal: {
    // Prompt
    prompt: "user@portfolio:~$ ",
    promptSpacing: " ",

    // Cursor
    cursorBlinkSpeed: 500,
    cursorWidth: "2px",
    cursorHeight: "1.25rem",

    // Typing Animation
    typingSpeed: {
      min: 50,
      max: 100,
    },
  },

  // BOOT SEQUENCE
  // ------------
  boot: {
    enabled: true,
    speed: {
      min: 200,
      max: 300,
    },
    messages: [
      { type: "ok", message: "Initializing system..." },
      { type: "ok", message: "Loading kernel modules..." },
      { type: "ok", message: "Starting network manager..." },
      { type: "warn", message: "Network security scan detected 3 potential vulnerabilities" },
      { type: "ok", message: "Applying security patches..." },
      { type: "ok", message: "Starting system services..." },
      { type: "ok", message: "Loading CV modules..." },
      { type: "ok", message: "System ready" },
    ],
  },

  // LOGIN SEQUENCE
  // -------------
  login: {
    enabled: true,
    username: "user",
    passwordMask: "••••",
    welcomeMessage: 'Welcome user. Type or click "help" to see available commands.',
  },

  // ANIMATIONS
  // ---------
  animations: {
    useTypingAnimation: true,
    simulateTypingForUserCommands: false,
  },
}

// ADVANCED SETTINGS
// ----------------
export const advancedSettings = {
  // Development settings
  debugMode: false,
  performanceMode: false,
}
