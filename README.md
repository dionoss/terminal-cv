# Terminal CV

A terminal-style CV/resume website that displays your professional information in a command-line interface.

## How to Customize Your Terminal CV

This Terminal CV is designed to be easily customizable even if you don't have any coding experience. You only need to edit two files to completely personalize your CV.

### 1. Customizing Content

To edit your CV content:

1. Open the file `data/cv-content.tsx`
2. Edit the information in each section
3. Add new sections by following the examples

#### Editing Existing Sections

Each section of your CV is organized in a simple structure. For example, to update your personal information:

\`\`\`tsx
personal: {
  // Command settings
  command: "whoami",
  shortcut: "w",
  description: "Display personal information",
  
  // Your information - edit these values
  name: "John Doe",
  title: "Senior Cybersecurity Engineer",
  location: "San Francisco, CA",
  summary: "Your summary here...",
  
  // Don't edit this part - it generates the content automatically
  get content() {
    // ...
  }
}
\`\`\`

Just update the values between the quotes to change your information.

#### Adding a New Section

To add a new section:

1. Uncomment and modify the example section at the bottom of the file
2. Add your section to the `sections` array

For example, to add a "Publications" section:

\`\`\`tsx
// First, uncomment and modify the publications section
publications: {
  command: "publications",
  shortcut: "pub",
  description: "Show my publications",
  
  items: [
    {
      title: "Your Publication Title",
      publisher: "Publisher Name",
      year: "2022",
      link: "https://example.com/your-publication"
    },
    // Add more publications...
  ],
  
  get content() {
    // Leave this part as is
  }
},

// Then add it to the sections array
export const sections = [
  cvContent.personal,
  cvContent.skills,
  cvContent.experience,
  cvContent.projects,
  cvContent.education,
  cvContent.contact,
  cvContent.hobbies,
  cvContent.publications,  // Add your new section here
]
\`\`\`

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

\`\`\`tsx
// To change the terminal background color:
background: "black", // Change to any color name or hex code like "#0f172a"

// To change the prompt text:
prompt: "user@portfolio:~$ ", // Change to whatever you prefer
\`\`\`

### 3. Boot Sequence Messages

You can customize the boot sequence messages:

\`\`\`tsx
export const bootMessages = [
  { type: "ok", message: "Your custom boot message here..." },
  { type: "warn", message: "This will show as a warning message" },
  // Add more messages as needed
]
\`\`\`

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
3. Contact the developer who provided this template
