# Terminal CV

A terminal-style CV/resume website that displays your professional information in a command-line interface.

## How to Customize Your Terminal CV

This Terminal CV is designed to be easily customizable even if you don't have any coding experience. You only need to edit two files to completely personalize your CV.

### 1. Customizing Content

To edit your CV content and add/modify commands:

1. Open the file `data/cv-content.tsx`
2. Edit the existing commands or add new ones following the examples

#### Adding a New Command

To add a new command, copy and paste one of the existing command objects and modify it:

```tsx
{
  command: "your-command-name",  // What users will type to run it
  shortcut: "y",                 // Optional shortcut (can be omitted)
  description: "Description of what this command shows",
  content: `
    <div>
      <p><strong>Your Section Title:</strong></p>
      <p>Your content goes here</p>
      <ul>
        <li>You can use simple HTML tags</li>
        <li>Like paragraphs, lists, and formatting</li>
      </ul>
    </div>
  `
}
```

#### HTML Tags You Can Use

You can use these HTML tags in your content:

- `<p>...</p>` - For paragraphs
- `<strong>...</strong>` - For bold text
- `<em>...</em>` - For emphasized text (usually displayed in yellow)
- `<ul>...</ul>` - For unordered lists
- `<li>...</li>` - For list items
- `<div>...</div>` - For grouping content

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

- When you type a command directly, it executes immediately
- When you click on a command link, it simulates typing the command first
- You can control animation settings in the `appearance.tsx` file

## Tips for Non-Technical Users

- Always keep the quotes (`"`) around text values
- Don't remove the commas at the end of lines
- If you're not sure, make a backup of the file before editing
- Test your changes after saving to make sure everything works

## Need Help?

If you encounter any issues, you can:

1. Restore from a backup
2. Check for missing quotes, commas, or brackets
3. Contact me!
