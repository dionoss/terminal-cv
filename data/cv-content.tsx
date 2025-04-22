// CV CONTENT FILE
// --------------
// Edit this file to update your CV information
// You don't need to modify any code - just update the text between quotes

// Content types for structured content
export type ContentItem =
  | { type: "heading"; text: string }
  | { type: "subheading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "keyValue"; key: string; value: string }
  | { type: "spacer" }
  | { type: "divider" }

// CV CONTENT
// ----------
// This is the main content of your CV
// Each section has a command that will display it in the terminal

export const cvContent = {
  // PERSONAL INFORMATION
  // -------------------
  // This section contains your basic information
  personal: {
    // Command settings
    command: "whoami",
    shortcut: "w",
    description: "Display personal information",

    // Your information
    name: "John Doe",
    title: "Senior Cybersecurity Engineer",
    location: "San Francisco, CA",
    summary: `Experienced cybersecurity professional with a passion for building secure systems and identifying
    vulnerabilities. Specialized in penetration testing, security architecture, and incident response.`,

    // This generates the content automatically - you don't need to edit this
    get content() {
      return [
        { type: "heading", text: "Personal Information:" },
        { type: "keyValue", key: "Name", value: this.name },
        { type: "keyValue", key: "Title", value: this.title },
        { type: "keyValue", key: "Location", value: this.location },
        { type: "spacer" },
        { type: "paragraph", text: this.summary },
      ] as ContentItem[]
    },
  },

  // SKILLS
  // ------
  // This section contains your technical skills
  skills: {
    // Command settings
    command: "skills",
    shortcut: "s",
    description: "List technical skills",

    // Your skills grouped by category
    categories: {
      security: ["Penetration Testing", "Vulnerability Assessment", "SIEM", "Incident Response", "Threat Modeling"],
      programming: ["Python", "JavaScript/TypeScript", "Bash", "PowerShell", "Go"],
      tools: ["Metasploit", "Burp Suite", "Wireshark", "Nmap", "Kali Linux", "Docker", "Kubernetes"],
      certifications: ["CISSP", "CEH", "OSCP", "AWS Security Specialty"],
    },

    // This generates the content automatically - you don't need to edit this
    get content() {
      return [
        { type: "heading", text: "Technical Skills:" },
        ...Object.entries(this.categories).flatMap(([category, skills]) => [
          { type: "spacer" },
          { type: "subheading", text: `${category.charAt(0).toUpperCase() + category.slice(1)}:` },
          { type: "paragraph", text: skills.join(", ") },
        ]),
      ] as ContentItem[]
    },
  },

  // EXPERIENCE
  // ----------
  // This section contains your work experience
  experience: {
    // Command settings
    command: "experience",
    shortcut: "e",
    description: "Show work experience",

    // Your work history
    jobs: [
      {
        title: "Senior Security Engineer",
        company: "TechSecure Inc.",
        period: "2020 - Present",
        achievements: [
          "Lead security assessments for enterprise clients",
          "Developed automated security scanning pipeline",
          "Reduced incident response time by 40% through process improvements",
        ],
      },
      {
        title: "Cybersecurity Analyst",
        company: "DefendCorp",
        period: "2017 - 2020",
        achievements: [
          "Conducted penetration tests on web and mobile applications",
          "Implemented security monitoring solutions",
          "Authored security policies and procedures",
        ],
      },
      {
        title: "IT Security Specialist",
        company: "SecureNet",
        period: "2015 - 2017",
        achievements: [
          "Managed security infrastructure including firewalls and IDS/IPS",
          "Performed vulnerability assessments",
          "Responded to security incidents",
        ],
      },
    ],

    // This generates the content automatically - you don't need to edit this
    get content() {
      return [
        { type: "heading", text: "Work Experience:" },
        ...this.jobs.flatMap((job) => [
          { type: "spacer" },
          { type: "subheading", text: `${job.title} | ${job.company}` },
          { type: "paragraph", text: job.period },
          { type: "list", items: job.achievements },
        ]),
      ] as ContentItem[]
    },
  },

  // PROJECTS
  // --------
  // This section contains your notable projects
  projects: {
    // Command settings
    command: "projects",
    shortcut: "p",
    description: "Display notable projects",

    // Your projects
    items: [
      {
        name: "SecureScanner",
        description: `Open-source vulnerability scanner with custom rule engine. Built with Python and React. Integrated with
        CI/CD pipelines for automated security testing.`,
      },
      {
        name: "ThreatHunter",
        description: `Threat hunting platform that uses machine learning to detect anomalies in network traffic. Reduced false
        positives by 60% compared to traditional SIEM solutions.`,
      },
      {
        name: "CryptoVault",
        description: `Secure password manager with zero-knowledge encryption. Implemented end-to-end encryption and secure key
        derivation functions.`,
      },
      {
        name: "SecurityDocs",
        description: `Contributed to open-source security documentation project. Created comprehensive guides for secure coding
        practices and security architecture.`,
      },
    ],

    // This generates the content automatically - you don't need to edit this
    get content() {
      return [
        { type: "heading", text: "Notable Projects:" },
        ...this.items.flatMap((project) => [
          { type: "spacer" },
          { type: "subheading", text: project.name },
          { type: "paragraph", text: project.description },
        ]),
      ] as ContentItem[]
    },
  },

  // EDUCATION
  // ---------
  // This section contains your educational background
  education: {
    // Command settings
    command: "education",
    shortcut: "ed",
    description: "Show educational background",

    // Your education
    degrees: [
      {
        degree: "M.S. in Cybersecurity",
        institution: "Stanford University",
        year: "2015",
      },
      {
        degree: "B.S. in Computer Science",
        institution: "MIT",
        year: "2013",
      },
    ],

    // Your certifications
    certifications: [
      "Certified Information Systems Security Professional (CISSP)",
      "Offensive Security Certified Professional (OSCP)",
      "Certified Ethical Hacker (CEH)",
      "AWS Certified Security - Specialty",
    ],

    // This generates the content automatically - you don't need to edit this
    get content() {
      return [
        { type: "heading", text: "Education:" },
        ...this.degrees.flatMap((edu) => [
          { type: "spacer" },
          { type: "subheading", text: edu.degree },
          { type: "paragraph", text: `${edu.institution}, ${edu.year}` },
        ]),
        { type: "spacer" },
        { type: "heading", text: "Certifications:" },
        { type: "list", items: this.certifications },
      ] as ContentItem[]
    },
  },

  // CONTACT
  // -------
  // This section contains your contact information
  contact: {
    // Command settings
    command: "contact",
    shortcut: "c",
    description: "Display contact information",

    // Your contact details
    email: "john.doe@example.com",
    linkedin: "linkedin.com/in/johndoe",
    github: "github.com/johndoe",
    twitter: "@johndoe_security",

    // This generates the content automatically - you don't need to edit this
    get content() {
      return [
        { type: "heading", text: "Contact Information:" },
        { type: "keyValue", key: "Email", value: this.email },
        { type: "keyValue", key: "LinkedIn", value: this.linkedin },
        { type: "keyValue", key: "GitHub", value: this.github },
        { type: "keyValue", key: "Twitter", value: this.twitter },
      ] as ContentItem[]
    },
  },

  // HOBBIES
  // -------
  // This section contains your hobbies and interests
  hobbies: {
    // Command settings
    command: "hobbies",
    shortcut: "h",
    description: "Show my hobbies and interests",

    // Your hobbies
    items: [
      "Participating in CTF competitions",
      "Contributing to open-source security tools",
      "Rock climbing and hiking",
      "Playing chess",
    ],

    // This generates the content automatically - you don't need to edit this
    get content() {
      return [
        { type: "heading", text: "Hobbies & Interests:" },
        { type: "list", items: this.items },
      ] as ContentItem[]
    },
  },

  // ADD YOUR OWN SECTIONS HERE
  // --------------------------
  // Copy one of the sections above and modify it to create your own section
  // Then add it to the 'sections' array below

  // Example of how to add a custom section:
  /*
  publications: {
    command: "publications",
    shortcut: "pub",
    description: "Show my publications",
    
    items: [
      {
        title: "Advanced Threat Hunting Techniques",
        publisher: "Security Journal",
        year: "2022",
        link: "https://example.com/publication1"
      },
      {
        title: "Zero Trust Architecture Implementation",
        publisher: "CyberSec Conference",
        year: "2021",
        link: "https://example.com/publication2"
      }
    ],
    
    get content() {
      return [
        { type: "heading", text: "Publications:" },
        ...this.items.flatMap(pub => [
          { type: "spacer" },
          { type: "subheading", text: pub.title },
          { type: "paragraph", text: `${pub.publisher}, ${pub.year}` },
          { type: "paragraph", text: `Link: ${pub.link}` },
        ])
      ] as ContentItem[]
    }
  },
  */
}

// List of sections to include in your CV
// The order here determines the order in the help command
export const sections = [
  cvContent.personal,
  cvContent.skills,
  cvContent.experience,
  cvContent.projects,
  cvContent.education,
  cvContent.contact,
  cvContent.hobbies,
  // Add your custom sections here
  // cvContent.publications,
]

// SYSTEM COMMANDS
// --------------
// These are built-in commands that you probably don't want to change
// But you can customize them if you want

export const systemCommands = [
  {
    command: "help",
    shortcut: "?",
    description: "Display available commands",
    // This content is generated automatically, you don't need to change it
  },
  {
    command: "clear",
    shortcut: "cls",
    description: "Clear the terminal",
    // This command is handled specially, you don't need to change it
  },
]

// The welcome message shown after login
// This is now handled directly in the terminal component
export const welcomeMessage = 'Welcome user. Type or click "help" to see available commands.'
