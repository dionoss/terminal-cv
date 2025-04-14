"use client"

import { useEffect, useState, useRef } from "react"
import type { ReactElement } from "react"
import TerminalLine from "./terminal-line"
import TerminalPrompt from "./terminal-prompt"
import { commands, generateCommands } from "@/lib/commands"
import { bootSequence } from "@/lib/boot-sequence"
import { terminalAppearance, advancedSettings } from "@/data/appearance"
import { welcomeMessage } from "@/data/cv-content"

export default function Terminal() {
  const [history, setHistory] = useState<Array<{ type: string; content: string | ReactElement }>>([])
  const [booting, setBooting] = useState(terminalAppearance.showBootSequence)
  const [loggedIn, setLoggedIn] = useState(!terminalAppearance.showLoginSequence)
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
  const [availableCommands, setAvailableCommands] = useState(commands)
  const terminalRef = useRef<HTMLDivElement>(null)

  // Initialize commands on client-side
  useEffect(() => {
    setAvailableCommands(generateCommands())
  }, [])

  // Handle boot sequence
  useEffect(() => {
    if (!terminalAppearance.showBootSequence) {
      setBooting(false)
      return
    }

    if (bootStep < bootSequence.length) {
      const timer = setTimeout(
        () => {
          setHistory((prev: Array<{ type: string; content: string | ReactElement }>) => [...prev, { type: "boot", content: bootSequence[bootStep] }])
          setBootStep(bootStep + 1)
        },
        Math.random() *
          (terminalAppearance.terminal.bootSequenceSpeed.max - terminalAppearance.terminal.bootSequenceSpeed.min) +
          terminalAppearance.terminal.bootSequenceSpeed.min,
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
    if (!terminalAppearance.showLoginSequence) {
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
                    <div>
                      Welcome user. Type or click{" "}
                      <button
                        onClick={() => simulateTyping("help")}
                        className="text-yellow-400 hover:text-yellow-200 hover:underline cursor-pointer"
                      >
                        help
                      </button>{" "}
                      to see available commands.
                    </div>
                  ),
                },
              ])
              setLoggedIn(true)

              // Automatically type help after 1 second
              setTimeout(() => {
                simulateTyping("help")
              }, 1000)
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
    if (!terminalAppearance.showLoginSequence) {
      setLoggedIn(true)
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

  // Typing animation effect for commands
  useEffect(() => {
    if (!advancedSettings.useTypingAnimation) {
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
      if (advancedSettings.useTypingAnimation) {
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
    const handleTerminalCommand = (e: CustomEvent<string>) => {
      if (!isTyping) {
        simulateTyping(e.detail)
      }
    }

    window.addEventListener("terminal-command", handleTerminalCommand as EventListener)

    return () => {
      window.removeEventListener("terminal-command", handleTerminalCommand as EventListener)
    }
  }, [isTyping])

  // Apply terminal appearance styles
  const terminalStyles = {
    backgroundColor: terminalAppearance.colors.background,
    borderColor: terminalAppearance.colors.terminalBorder,
    fontFamily: advancedSettings.fontFamily,
    fontSize: advancedSettings.fontSize,
    borderRadius: terminalAppearance.terminal.roundedCorners ? "0.5rem" : "0",
    height: `${advancedSettings.terminalHeight}`,
  }

  const glowEffect = terminalAppearance.terminal.showGlowEffect ? (
    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(0,100,0,0.1),transparent)] pointer-events-none"></div>
  ) : null

  return (
    <div
      className={`relative overflow-y-auto p-4 border border-solid rounded-lg shadow-lg cursor-text w-full max-w-${advancedSettings.terminalMaxWidth} md:h-[${advancedSettings.terminalHeightDesktop}]`}
      style={terminalStyles}
      ref={terminalRef}
      onClick={() => {
        if (terminalRef.current) {
          const input = terminalRef.current.querySelector('input');
          if (input) {
            input.focus();
          }
        }
      }}
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
              className={`h-5 w-2 ml-0.5 animate-blink`}
              style={{ backgroundColor: terminalAppearance.colors.defaultText }}
            ></span>
          </div>
        )}

        {loggedIn && !isTyping && (
          <div className="flex items-center">
            <span style={{ color: terminalAppearance.colors.promptText }}>{terminalAppearance.terminal.prompt}</span>
            <div className="ml-2 flex-1">
              <TerminalPrompt
                onCommand={handleUserCommand}
                commands={availableCommands}
                promptText=""
                textColor={terminalAppearance.colors.promptText}
                commandColor={terminalAppearance.colors.commandText}
                cursorColor={terminalAppearance.colors.defaultText}
                cursorBlinkSpeed={terminalAppearance.terminal.cursorBlinkSpeed}
              />
            </div>
          </div>
        )}

        {isTyping && (
          <div className="flex items-center">
            <span style={{ color: terminalAppearance.colors.promptText }}>{terminalAppearance.terminal.prompt}</span>
            <span className="ml-2" style={{ color: terminalAppearance.colors.commandText }}>{currentTypingText}</span>
            <span
              className={`h-5 w-2 ml-0.5 animate-blink`}
              style={{
                backgroundColor: terminalAppearance.colors.defaultText,
                animationDuration: `${terminalAppearance.terminal.cursorBlinkSpeed * 2}ms`,
              }}
            ></span>
          </div>
        )}
      </div>
    </div>
  )
}
