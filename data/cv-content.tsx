// @cursor-lock
/**
 * CV Content Configuration
 * =====================
 * 
 * This module defines the content and structure of the terminal CV.
 * 
 * Features:
 * - Personal information
 * - Professional experience
 * - Skills and expertise
 * - Education and certifications
 * - Projects and achievements
 */

// CV CONTENT FILE
// --------------
// Edit this file to update your CV information
// You don't need to modify any code - just update the text between quotes, 
// use backticks for multi-line strings and use double quotes for single line strings.

export const whoami = {
  command: "whoami",
  shortcut: "w",
  description: "Show personal information",
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

export const skills = {
  command: "skills",
  description: "Show technical skills",
  content: {
    // Group your skills by category
    security: [
      "Penetration Testing", 
      "Vulnerability Assessment", 
      "SIEM", 
      "Incident Response", 
      "Threat Modeling"
    ],

    programming: [
      "Python", 
      "JavaScript/TypeScript", 
      "Bash", 
      "PowerShell", 
      "Go"
    ],

    tools: [
      "Metasploit", 
      "Burp Suite", 
      "Wireshark", 
      "Nmap", 
      "Kali Linux", 
      "Docker", 
      "Kubernetes"
    ],
    // change to false to hide certifications in skills
    certifications: true ? [
      "CISSP", 
      "CEH", 
      "OSCP", 
      "AWS Security Specialty"
    ] : null,
  }
}

export const experience = {
  command: "experience",
  description: "Show professional experience",
  content: {
    // Most recent experience first
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
        responsibilities: [
          "Conducted penetration tests on web and mobile applications",
          "Implemented security monitoring solutions",
          "Authored security policies and procedures",
        ],
      },
      // Add more jobs as needed
    ]
  }
}

export const education = {
  command: "education",
  description: "Show educational background",
  content: {
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
    // change to false to hide certifications in education
    certifications: true ? [
      "CISSP", 
      "CEH", 
      "OSCP", 
      "AWS Security Specialty"
    ] : null,
  }
}

// Add more commands as needed, simply copy and paste the above and change the content.