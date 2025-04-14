// CV CONTENT FILE
// --------------
// Edit this file to update your CV information
// You don't need to modify any code - just update the text between quotes

export const personalInfo = {
  // Basic information
  name: "John Doe",
  title: "Senior Cybersecurity Engineer",
  location: "San Francisco, CA",

  // Short bio/summary - appears in the whoami command
  summary: `Experienced cybersecurity professional with a passion for building secure systems and identifying
  vulnerabilities. Specialized in penetration testing, security architecture, and incident response.`,

  // Contact information - appears in the contact command
  contact: {
    email: "john.doe@example.com",
    linkedin: "linkedin.com/in/johndoe",
    github: "github.com/johndoe",
    twitter: "@johndoe_security",
    // Add any other contact methods you want
  },
}

export const skills = {
  // Group your skills by category
  security: ["Penetration Testing", "Vulnerability Assessment", "SIEM", "Incident Response", "Threat Modeling"],

  programming: ["Python", "JavaScript/TypeScript", "Bash", "PowerShell", "Go"],

  tools: ["Metasploit", "Burp Suite", "Wireshark", "Nmap", "Kali Linux", "Docker", "Kubernetes"],

  certifications: ["CISSP", "CEH", "OSCP", "AWS Security Specialty"],
}

export const experience = [
  // Most recent experience first
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
  // Add more jobs as needed
]

export const projects = [
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
  // Add more projects as needed
]

export const education = {
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

  // You can duplicate certifications from skills if you want them to appear in both places
  certifications: [
    "Certified Information Systems Security Professional (CISSP)",
    "Offensive Security Certified Professional (OSCP)",
    "Certified Ethical Hacker (CEH)",
    "AWS Certified Security - Specialty",
  ],
}

// Add any additional sections you want to include in your CV
// Then update the commands.tsx file to display them

// CUSTOM COMMANDS
// --------------
// This section allows you to create your own commands
// Follow the examples below to add, modify, or remove commands

export const customCommands = [
  // Each object represents a command
  {
    // The command name (what users will type to run it)
    command: "whoami",

    // Optional shortcut (e.g., "w" instead of typing "whoami")
    shortcut: "w",

    // Description shown in the help menu
    description: "Display personal information",

    // The content to display when the command is run
    // You can use simple HTML tags like <p>, <ul>, <li>, <strong>, <em>
    content: `
      <div>
        <p><strong>Personal Information:</strong></p>
        <p>Name: John Doe</p>
        <p>Title: Senior Cybersecurity Engineer</p>
        <p>Location: San Francisco, CA</p>
        <p>Experienced cybersecurity professional with a passion for building secure systems and identifying
        vulnerabilities. Specialized in penetration testing, security architecture, and incident response.</p>
      </div>
    `,
  },
  {
    command: "skills",
    shortcut: "s",
    description: "List technical skills",
    content: `
      <div>
        <p><strong>Technical Skills:</strong></p>
        
        <div>
          <p><em>Security:</em></p>
          <p>Penetration Testing, Vulnerability Assessment, SIEM, Incident Response, Threat Modeling</p>
        </div>
        
        <div>
          <p><em>Programming:</em></p>
          <p>Python, JavaScript/TypeScript, Bash, PowerShell, Go</p>
        </div>
        
        <div>
          <p><em>Tools & Technologies:</em></p>
          <p>Metasploit, Burp Suite, Wireshark, Nmap, Kali Linux, Docker, Kubernetes</p>
        </div>
        
        <div>
          <p><em>Certifications:</em></p>
          <p>CISSP, CEH, OSCP, AWS Security Specialty</p>
        </div>
      </div>
    `,
  },
  {
    command: "experience",
    shortcut: "e",
    description: "Show work experience",
    content: `
      <div>
        <p><strong>Work Experience:</strong></p>
        
        <div>
          <p><em>Senior Security Engineer | TechSecure Inc.</em></p>
          <p>2020 - Present</p>
          <ul>
            <li>Lead security assessments for enterprise clients</li>
            <li>Developed automated security scanning pipeline</li>
            <li>Reduced incident response time by 40% through process improvements</li>
          </ul>
        </div>
        
        <div>
          <p><em>Cybersecurity Analyst | DefendCorp</em></p>
          <p>2017 - 2020</p>
          <ul>
            <li>Conducted penetration tests on web and mobile applications</li>
            <li>Implemented security monitoring solutions</li>
            <li>Authored security policies and procedures</li>
          </ul>
        </div>
        
        <div>
          <p><em>IT Security Specialist | SecureNet</em></p>
          <p>2015 - 2017</p>
          <ul>
            <li>Managed security infrastructure including firewalls and IDS/IPS</li>
            <li>Performed vulnerability assessments</li>
            <li>Responded to security incidents</li>
          </ul>
        </div>
      </div>
    `,
  },
  {
    command: "projects",
    shortcut: "p",
    description: "Display notable projects",
    content: `
      <div>
        <p><strong>Notable Projects:</strong></p>
        
        <div>
          <p><em>SecureScanner</em></p>
          <p>Open-source vulnerability scanner with custom rule engine. Built with Python and React. Integrated with
          CI/CD pipelines for automated security testing.</p>
        </div>
        
        <div>
          <p><em>ThreatHunter</em></p>
          <p>Threat hunting platform that uses machine learning to detect anomalies in network traffic. Reduced false
          positives by 60% compared to traditional SIEM solutions.</p>
        </div>
        
        <div>
          <p><em>CryptoVault</em></p>
          <p>Secure password manager with zero-knowledge encryption. Implemented end-to-end encryption and secure key
          derivation functions.</p>
        </div>
        
        <div>
          <p><em>SecurityDocs</em></p>
          <p>Contributed to open-source security documentation project. Created comprehensive guides for secure coding
          practices and security architecture.</p>
        </div>
      </div>
    `,
  },
  {
    command: "education",
    shortcut: "ed",
    description: "Show educational background",
    content: `
      <div>
        <p><strong>Education:</strong></p>
        
        <div>
          <p><em>M.S. in Cybersecurity</em></p>
          <p>Stanford University, 2015</p>
        </div>
        
        <div>
          <p><em>B.S. in Computer Science</em></p>
          <p>MIT, 2013</p>
        </div>
        
        <div>
          <p><strong>Certifications:</strong></p>
          <ul>
            <li>Certified Information Systems Security Professional (CISSP)</li>
            <li>Offensive Security Certified Professional (OSCP)</li>
            <li>Certified Ethical Hacker (CEH)</li>
            <li>AWS Certified Security - Specialty</li>
          </ul>
        </div>
      </div>
    `,
  },
  {
    command: "contact",
    shortcut: "c",
    description: "Display contact information",
    content: `
      <div>
        <p><strong>Contact Information:</strong></p>
        <p>Email: john.doe@example.com</p>
        <p>LinkedIn: linkedin.com/in/johndoe</p>
        <p>GitHub: github.com/johndoe</p>
        <p>Twitter: @johndoe_security</p>
      </div>
    `,
  },

  // You can add your own custom commands below
  // Just copy the format of the examples above
  // For example:

  {
    command: "hobbies",
    shortcut: "h",
    description: "Show my hobbies and interests",
    content: `
      <div>
        <p><strong>Hobbies & Interests:</strong></p>
        <ul>
          <li>Participating in CTF competitions</li>
          <li>Contributing to open-source security tools</li>
          <li>Rock climbing and hiking</li>
          <li>Playing chess</li>
        </ul>
      </div>
    `,
  },

  // Add more commands as needed
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
export const welcomeMessage = 'Welcome user. Type "help" or click the help button to see available commands.'
