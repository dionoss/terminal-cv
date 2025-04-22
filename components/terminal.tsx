"use client"

import { useEffect, useState, useRef } from "react"
import TerminalLine from "./terminal-line"
import TerminalPrompt from "./terminal-prompt"
import { commands, generateCommands } from "@/lib/commands"
import { bootSequence } from "@/lib/boot-sequence"
import { terminalAppearance, advancedSettings } from "@/data/appearance"
export default function Terminal() {
  const [history, setHistory] = useState<Array<{ type: string; content: string | React.ReactNode }>>([])
  const [booting, setBooting] = useState(terminalAppearance.boot.enabled)
  const [loggedIn, setLoggedIn] = useState(!terminalAppearance.login.enabled)
  const [bootStep, setBootStep] = useState(0)
  const [loginStep, setLoginStep] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [currentTypingText, setCurrentTypingText] = useState("")
  const [commandToExecute, setCommandToExecute] = useState<string | null>(null)
  const [loginTyping, setLoginTyping] = useState({
    isTyping: false,
    text: "",
    target: "",
    step: 0,
  })
  const [cursorVisible, setCursorVisible] = useState(true)
  const [availableCommands, setAvailableCommands] = useState(commands)
  const [hasShownHelp, setHasShownHelp] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)

  // Initialize commands on client-side
  useEffect(() => {
    setAvailableCommands(generateCommands())
  }, [])

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, terminalAppearance.terminal.cursorBlinkSpeed)

    return () => clearInterval(interval)
  }, [])

  // Handle boot sequence
  useEffect(() => {
    if (!terminalAppearance.boot.enabled) {
      setBooting(false)
      return
    }

    if (bootStep < bootSequence.length) {
      const timer = setTimeout(
        () => {
          setHistory((prev) => [...prev, { type: "boot", content: bootSequence[bootStep] }])
          setBootStep(bootStep + 1)
        },
        Math.random() *
          (terminalAppearance.boot.speed.max - terminalAppearance.boot.speed.min) +
          terminalAppearance.boot.speed.min,
      )

      return () => clearTimeout(timer)
    } else if (booting) {
      const timer = setTimeout(() => {
        setBooting(false)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [bootStep, booting])

  // Handle login typing animation
  useEffect(() => {
    if (!terminalAppearance.login.enabled) {
      setLoggedIn(true)
      return
    }

    if (!booting && !loggedIn && loginTyping.isTyping) {
      if (loginTyping.text.length < loginTyping.target.length) {
        const timer = setTimeout(
          () => {
            setLoginTyping((prev) => ({
              ...prev,
              text: loginTyping.target.substring(0, loginTyping.text.length + 1),
            }))
          },
          Math.random() * 100 + 50,
        )

        return () => clearTimeout(timer)
      } else {
        // Finished typing current login step
        const timer = setTimeout(() => {
          if (loginTyping.step === 0) {
            // Finished typing username
            setHistory((prev) => [...prev, { type: "system", content: `login: ${loginTyping.text}` }])
            setLoginTyping({
              isTyping: true,
              text: "",
              target: terminalAppearance.login.passwordMask,
              step: 1,
            })
          } else if (loginTyping.step === 1) {
            // Finished typing password
            setHistory((prev) => [...prev, { type: "system", content: `Password: ${loginTyping.text}` }])
            setLoginTyping({
              isTyping: false,
              text: "",
              target: "",
              step: 2,
            })

            // Show welcome message with clickable help
            const timer = setTimeout(() => {
              setHistory((prev) => [
                ...prev,
                {
                  type: "system",
                  content: (
                    <span>
                      {terminalAppearance.login.welcomeMessage}
                    </span>
                  ),
                },
              ])
              setLoggedIn(true)
            }, 1000)

            return () => clearTimeout(timer)
          }
        }, 500)

        return () => clearTimeout(timer)
      }
    }
  }, [booting, loggedIn, loginTyping])

  // Start login sequence
  useEffect(() => {
    if (!terminalAppearance.login.enabled) {
      setLoggedIn(true)
      // Auto type help command if login sequence is disabled
      setTimeout(() => simulateTyping("help"), 1000)
      return
    }

    if (!booting && !loggedIn && loginStep === 0 && !loginTyping.isTyping) {
      setLoginTyping({
        isTyping: true,
        text: "",
        target: terminalAppearance.login.username,
        step: 0,
      })
      setLoginStep(1)
    }
  }, [booting, loggedIn, loginStep, loginTyping.isTyping])

  // Auto type help command after login
  useEffect(() => {
    if (loggedIn && !isTyping && !commandToExecute && !hasShownHelp) {
      // Small delay after login to ensure smooth transition
      const timer = setTimeout(() => {
        simulateTyping("help")
        setHasShownHelp(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [loggedIn, isTyping, commandToExecute, hasShownHelp])

  // Typing animation effect for commands
  useEffect(() => {
    if (!terminalAppearance.animations.useTypingAnimation) {
      if (commandToExecute) {
        executeCommand(commandToExecute)
        setCommandToExecute(null)
      }
      return
    }

    if (isTyping && commandToExecute) {
      if (currentTypingText.length < commandToExecute.length) {
        const timer = setTimeout(
          () => {
            setCurrentTypingText(commandToExecute.substring(0, currentTypingText.length + 1))
          },
          Math.random() * (terminalAppearance.terminal.typingSpeed.max - terminalAppearance.terminal.typingSpeed.min) +
            terminalAppearance.terminal.typingSpeed.min,
        )

        return () => clearTimeout(timer)
      } else {
        // Finished typing, execute the command
        const timer = setTimeout(() => {
          executeCommand(commandToExecute)
          setIsTyping(false)
          setCurrentTypingText("")
          setCommandToExecute(null)
        }, 200) // Small delay after typing finishes

        return () => clearTimeout(timer)
      }
    }
  }, [isTyping, currentTypingText, commandToExecute])

  // Scroll to bottom when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history, currentTypingText, loginTyping.text])

  // Execute a command directly (without typing animation)
  const executeCommand = (cmd: string) => {
    setHistory((prev) => [...prev, { type: "command", content: cmd }])

    if (cmd === "clear") {
      setHistory([])
      return
    }

    const command = availableCommands.find((c) => cmd === c.command || cmd === c.shortcut)

    if (command) {
      setHistory((prev) => [...prev, { type: "output", content: command.output }])
    } else if (cmd.trim() !== "") {
      setHistory((prev) => [
        ...prev,
        {
          type: "error",
          content: `Command not found: ${cmd}. Type "help" to see available commands.`,
        },
      ])
    }
  }

  // Handle command from user typing (direct execution)
  const handleUserCommand = (cmd: string) => {
    executeCommand(cmd)
  }

  // Handle command from clicking (with typing animation)
  const simulateTyping = (cmd: string) => {
    if (!isTyping) {
      if (terminalAppearance.animations.useTypingAnimation) {
        setIsTyping(true)
        setCurrentTypingText("")
        setCommandToExecute(cmd)
      } else {
        executeCommand(cmd)
      }
    }
  }

  // Listen for custom terminal command events
  useEffect(() => {
    const handleTerminalCommand = (e: Event) => {
      if (!isTyping) {
        simulateTyping((e as CustomEvent<string>).detail)
      }
    }

    window.addEventListener("terminal-command", handleTerminalCommand)

    return () => {
      window.removeEventListener("terminal-command", handleTerminalCommand)
    }
  }, [isTyping])

  // Apply terminal appearance styles
  const terminalStyles = {
    backgroundColor: terminalAppearance.colors.background,
    borderColor: terminalAppearance.colors.terminalBorder,
    fontFamily: terminalAppearance.typography.fontFamily,
    fontSize: terminalAppearance.typography.fontSize,
    lineHeight: terminalAppearance.typography.lineHeight,
    letterSpacing: terminalAppearance.typography.letterSpacing,
    borderRadius: terminalAppearance.layout.roundedCorners ? "0.5rem" : "0",
    height: terminalAppearance.layout.height.mobile,
    cursor: "default",
  }

  const glowEffect = terminalAppearance.layout.showGlowEffect ? (
    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(0,100,0,0.1),transparent)] pointer-events-none"></div>
  ) : null

  return (
    <div
      className={`w-full max-w-${terminalAppearance.layout.maxWidth} md:h-[${terminalAppearance.layout.height.desktop}] overflow-y-auto border shadow-lg shadow-green-500/10 p-4 font-mono relative`}
      style={terminalStyles}
      ref={terminalRef}
    >
      {glowEffect}
      <div className="relative z-10">
        {history.map((item, index) => {
          return <TerminalLine key={index} type={item.type} content={item.content} />
        })}

        {!booting && !loggedIn && loginTyping.isTyping && (
          <div className="flex items-center">
            <span style={{ color: terminalAppearance.colors.defaultText }}>
              {loginTyping.step === 0 ? "login: " : "Password: "}
              {loginTyping.text}
            </span>
            <span
              className={`h-5 w-2 ml-0.5 ${cursorVisible ? "opacity-100" : "opacity-0"}`}
              style={{ backgroundColor: terminalAppearance.colors.defaultText }}
            ></span>
          </div>
        )}

        {loggedIn && !isTyping && (
          <TerminalPrompt
            onCommand={handleUserCommand}
            commands={availableCommands}
            promptText={terminalAppearance.terminal.prompt}
            textColor={terminalAppearance.colors.promptText}
            commandColor={terminalAppearance.colors.commandText}
            cursorColor={terminalAppearance.colors.cursorColor}
            cursorBlinkSpeed={terminalAppearance.terminal.cursorBlinkSpeed}
          />
        )}

        {isTyping && (
          <div className="flex items-center">
            <pre style={{ color: terminalAppearance.colors.promptText, margin: 0 }}>{terminalAppearance.terminal.prompt}</pre>
            <span style={{ color: terminalAppearance.colors.commandText }}>{currentTypingText}</span>
            <span
              className={`h-5 w-2 ml-0.5 ${cursorVisible ? "opacity-100" : "opacity-0"}`}
              style={{
                backgroundColor: terminalAppearance.colors.defaultText,
              }}
            ></span>
          </div>
        )}
      </div>
    </div>
  )
}
