// @cursor-lock
# Terminal CV

A terminal-style CV/resume website that displays your professional information in a command-line interface.

## 📸 Screenshot
![screenshot (to be added)](./public/screenshot.png)

## 🧪 Try It Online
[Live Demo (to be added)](https://cv.dionave.dev/)

## How to Customize Your Terminal CV

This Terminal CV is designed to be easily customizable even if you don't have any coding experience. You only need to edit two files to completely personalize your CV. Easy right?

### 1. Customizing Content

To edit your CV content and add/modify commands:

1. Open the file `data/cv-content.tsx`
2. Edit the existing commands or add new ones by copy and pasting one of the existing command objects and modify it:

```tsx
export const whoami = {
  command: "whoami",
  shortcut: "w", // this is the short command, similar to how cls clears your screen.
  description: "Show personal information", //this is shown in the help command.
  content: {
    // Basic information
    name: "John Doe",
    title: "Senior Cybersecurity Engineer",
    location: "San Francisco, CA",

    // Short bio/summary
    summary: `Experienced cybersecurity professional with a passion for building secure systems and identifying 
    vulnerabilities. Specialized in penetration testing, security architecture, and incident response.`,

    // Contact information
    contact: {
      email: "john.doe@example.com",
      linkedin: "linkedin.com/in/johndoe",
      github: "github.com/johndoe",
      twitter: "@johndoe_security",
      // Add any other contact methods you want
    },
  }
}
```
### 2. Customizing Appearance

To change how your terminal looks:

1. Open the file `data/appearance.tsx`
2. Modify the values to change colors, animations, and other visual aspects

#### What You Can Customize

- **Colors**: Background, text, borders, etc.
- **Terminal Settings**: Prompt text, cursor blink speed, etc.
- **Boot Sequence**: The startup messages
- **Login Sequence**: Username and password display
- **Animation Settings**: Control typing animations for commands

#### Example

```tsx
// To change the terminal background color:
background: "black", // Change to any color name or hex code like "#0f172a"

// To change the prompt text:
prompt: "user@portfolio:~$ ", // Change to whatever you prefer
```

### 3. Boot Sequence Messages

You can customize the boot sequence messages:

```tsx
export const bootMessages = [
  { type: "ok", message: "Your custom boot message here..." },
  { type: "warn", message: "This will show as a warning message" },
  // Add more messages as needed
]
```

### 4. Terminal Behavior

The terminal has some special behaviors:
- When you type a command directly and press enter, it executes immediately
- When you click on a command link, it simulates typing the command first

### 5. Future Features
- [ ] Add screenshot
- [ ] Add live demo
- [ ] Add build information
- [ ] Command autocompletion using TAB
- [ ] Configurable theme (light/dark/system)
- [ ] Command `history` list output
- [X] Command alias system (e.g., `ls` for `help`)
- [ ] Mobile responsive terminal view
- [ ] Download as `.pdf` resume command
- [ ] Create dockerfile

## Tips for Non-Technical Users

- Always keep the quotes (``) or ("") around text values
- Don't remove the commas at the end of lines
- If you're not sure, make a backup of the file before editing
- Test your changes after saving to make sure everything works

## Need Help?

If you encounter any issues, you can:

1. Restore from a backup
2. Check for missing quotes, commas, or brackets
3. Contact me!

------------------


## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)

## Customization

Edit the following files to customize your CV:
- `data/cv-content.tsx`: Update your personal information and commands
- `data/appearance.tsx`: Customize the terminal's look and feel

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Security Considerations

When adding new features or modifying existing ones:
1. Validate all user input
4. Keep dependencies updated
5. Test for security vulnerabilities

## License

MIT
