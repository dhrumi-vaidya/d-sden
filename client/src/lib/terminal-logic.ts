import { CommandDefinition, FileSystemNode } from "./types";

// --- Mock Data & Content ---

export const mockFileSystem: { [key: string]: FileSystemNode } = {
  projects: {
    name: "projects",
    type: "directory",
    children: {
      "job-portal": {
        name: "job-portal",
        type: "file",
        description: "Job Portal Web Application (Angular frontend)",
        content:
          "Job Portal Web Application\n\n" +
          "--type\n" +
          "Job portal web app with Angular frontend\n\n" +
          "--role\n" +
          "Frontend Angular Developer\n\n" +
          "--focus\n" +
          "Built responsive UI pages using Angular components, implemented candidate and job listing views, basic filters, pagination, and integrated REST APIs for job-related data.\n\n" +
          "--learning\n" +
          "Strengthened understanding of component-driven UI structure, reusability, and debugging API-driven state.",
      },
      "internal-apps": {
        name: "internal-apps",
        type: "file",
        description: "Internal company web applications and dashboards",
        content:
          "Internal Company Web Applications\n\n" +
          "--type\n" +
          "Internal web apps and dashboards used within the organization\n\n" +
          "--role\n" +
          "Frontend Angular Developer\n\n" +
          "--focus\n" +
          "Developed and maintained UI components for internal tools, integrated REST APIs, fixed UI bugs, and improved responsiveness and user experience in production codebases.\n\n" +
          "--learning\n" +
          "Improved skills in working with existing codebases, incremental UI refactors, and collaborating through Git/GitHub workflows.",
      },
      "kutumb-os": {
        name: "kutumb-os",
        type: "file",
        description: "Kutumb OS – family management platform (personal system project)",
        content:
          "Kutumb OS — Family Management Platform\n\n" +
          "--type\n" +
          "Personal family management web application\n\n" +
          "--stack\n" +
          "Angular\n\n" +
          "--focus\n" +
          "Modular UI, role-aware screens (e.g., parent vs. member), and clear navigation between shared family views.\n\n" +
          "--learning\n" +
          "Experimented with routing structure, reusable layout components, and handling shared state between related views.",
      },
      "finance-tracker": {
        name: "finance-tracker",
        type: "file",
        description: "Finance Tracker – personal expenses tracking UI (personal project)",
        content:
          "Finance Tracker — Personal Expenses UI\n\n" +
          "--type\n" +
          "Personal finance tracking interface\n\n" +
          "--stack\n" +
          "Angular\n\n" +
          "--focus\n" +
          "Simple views for logging expenses, listing transactions, and basic filtering.\n\n" +
          "--learning\n" +
          "Practiced form handling, list rendering, and clean component structure for small feature flows.",
      },
      "practice-projects": {
        name: "practice-projects",
        type: "file",
        description: "Practice and learning projects (non-production)",
        content:
          "Practice / Learning Projects\n\n" +
          "--scope\n" +
          "Small UI experiments and sample applications used to learn Angular, TypeScript, and frontend concepts.\n\n" +
          "--note\n" +
          "These projects are for practice only and are not production systems.",
      },
    },
  },
  skills: {
    name: "skills",
    type: "file",
    content:
      "Frontend Core:\n" +
      "- Angular\n" +
      "- TypeScript\n" +
      "- JavaScript\n" +
      "- HTML\n" +
      "- CSS\n\n" +
      "UI & Integration:\n" +
      "- REST API integration\n" +
      "- Responsive design\n" +
      "- UI/UX implementation\n\n" +
      "Tooling & Workflow:\n" +
      "- Git\n" +
      "- GitHub\n" +
      "- REST API testing\n" +
      "- Webflow\n" +
      "- Wix\n" +
      "- Low-code / no-code platforms (exploratory)\n" +
      "  Exploratory use of Webflow and Wix for simple page setups and understanding low-code workflows.\n\n" +
      "Languages:\n" +
      "- English\n" +
      "- Hindi\n" +
      "- Gujarati",
  },
  about: {
    name: "about",
    type: "file",
    content:
      "Frontend engineer working with Angular to build responsive, maintainable UI components and pages.\n" +
      "Focus on clear structure, clean state handling, and reliable REST API integration, while continuously improving workflow and exploring low-code tools like Webflow and Wix for simple interfaces.",
  },
  arch: {
    name: "arch",
    type: "file",
    content:
      "Frontend Approach:\n" +
      "1. Component-driven UIs with clear responsibilities\n" +
      "2. Keep REST API integration simple and well-typed\n" +
      "3. Prefer readable, maintainable code over cleverness\n" +
      "4. Make layouts responsive first, then refine visual details",
  },
  contact: {
    name: "contact",
    type: "file",
    content:
      "Email: dhrumi.vaidy@gmail.com\n" +
      "Phone: +91 84694 60710\n" +
      "LinkedIn: https://www.linkedin.com/in/dhrumi-vaidya",
  },
};

// --- Command Logic ---

const getFlags = (args: string[]) => {
  const flags: Record<string, boolean> = {};
  const cleanArgs: string[] = [];
  
  args.forEach(arg => {
    if (arg.startsWith('--')) {
      flags[arg.slice(2)] = true;
    } else {
      cleanArgs.push(arg);
    }
  });
  
  return { flags, args: cleanArgs };
};

export const commands: Record<string, CommandDefinition> = {
  help: {
    name: "help",
    description: "List available commands",
    handler: () =>
      "Available commands: help, status, overview (o), projects (p), project, skills (s), arch, about (me), experience (exp), education, recruiter, contact, li, back, clear.\n\n" +
      "Flags:\n" +
      "  --deep    Detailed view (where supported)",
  },
  status: {
    name: "status",
    description: "System overview / landing state",
    handler: (_args, _flags) => {
      return "STATUS_COMPONENT";
    },
  },
  overview: {
    name: "overview",
    description: "High-level portfolio overview",
    handler: () =>
      "Frontend Portfolio — Overview\n" +
      "────────────────────────────\n\n" +
      "[Identity]\n" +
      "Name: Dhrumi Vaidya\n" +
      "Role: Frontend Engineer (Angular)\n" +
      "Experience: ~1 year (production + internships)\n\n" +
      "[Highlights]\n" +
      "› [Job Portal Web Application]\n" +
      "› [Kutumb OS]\n" +
      "› [Finance Tracker]\n\n" +
      "[Quick access]\n" +
      "[projects]  [skills]  [experience]  [arch]  [recruiter]  [contact]",
  },
  projects: {
    name: "projects",
    description: "List projects and work",
    handler: (_args, flags) => {
      if (flags.deep) {
        return Object.entries(mockFileSystem.projects.children || {})
          .map(([name, node]) => {
            const details = node.content as string;
            // Deep view: show full content for each project
            return `* ${name.padEnd(20)} \n  ${node.description}\n  ----------------------------------------\n  ${details}`;
          })
          .join("\n\n");
      }
      const orderedKeys = [
        "job-portal",
        "internal-apps",
        "kutumb-os",
        "finance-tracker",
      ] as const;
      const children = mockFileSystem.projects.children || {};
      const lines: string[] = [];
      orderedKeys.forEach((key, index) => {
        const node = children[key];
        if (node) {
          lines.push(
            `${index + 1}. ${node.description}`
          );
        }
      });
      return (
        lines.join("\n") +
        "\n\nClick a project or run:\n" +
        "project job-portal | project internal-apps | project kutumb-os | project finance-tracker\n" +
        "\n(Use --deep for full details on all projects)"
      );
    },
  },
  project: {
    name: "project",
    description: "View a single project's details",
    usage: "project <key> (e.g., project job-portal)",
    handler: (args) => {
      const children = mockFileSystem.projects.children || {};

      if (!args.length) {
        const keys = Object.keys(children);
        return (
          "Usage: project <key>\n\n" +
          "Available keys:\n" +
          keys.map((key) => `- ${key}`).join("\n")
        );
      }

      const key = args[0];
      const node = children[key];

      if (!node) {
        return `Unknown project key: ${key}`;
      }

      return node.content as string;
    },
  },
  // Aliases for quicker navigation
  o: {
    name: "o",
    description: "Alias for overview",
    handler: (_args, flags) => commands.overview.handler(_args, flags),
  },
  p: {
    name: "p",
    description: "Alias for projects",
    handler: (_args, flags) => commands.projects.handler(_args, flags),
  },
  s: {
    name: "s",
    description: "Alias for skills",
    handler: (_args, flags) => commands.skills.handler(_args, flags),
  },
  exp: {
    name: "exp",
    description: "Alias for experience",
    handler: (_args, flags) => commands.experience.handler(_args, flags),
  },
  me: {
    name: "me",
    description: "Alias for about",
    handler: (_args, flags) => commands.about.handler(_args, flags),
  },
  li: {
    name: "li",
    description: "LinkedIn profile shortcut",
    handler: () =>
      "LinkedIn profile: linkedin.com/in/dhrumi-vaidya  [Open]  [Copy LinkedIn URL]",
  },
  back: {
    name: "back",
    description: "Return to landing view",
    handler: () => "NAVIGATE_HOME",
  },
  arch: {
    name: "arch",
    description: "Frontend approach and principles",
    handler: () => mockFileSystem.arch.content as string,
  },
  skills: {
    name: "skills",
    description: "Skills grouped by domain",
    handler: () => mockFileSystem.skills.content as string,
  },
  about: {
    name: "about",
    description: "Concise technical profile",
    handler: () => mockFileSystem.about.content as string,
  },
  experience: {
    name: "experience",
    description: "Professional experience and internships",
    handler: () =>
      "Associate Software Engineer — Theta Technolabs (Jan 2025 – Present)\n" +
      "- Built responsive Angular UI components\n" +
      "- Integrated REST APIs\n" +
      "- Worked on real production projects\n" +
      "- Collaborated via Git/GitHub\n" +
      "- Participated in debugging and UI improvements\n" +
      "- Followed UI/UX and responsive design principles\n" +
      "- Explored low-code/no-code tools for faster delivery\n\n" +
      "Internships\n" +
      "- Theta Technolabs (6 months): Job portal UI using Angular\n" +
      "- Tatvasoft (15 days): .NET fundamentals, C#, SQL basics",
  },
  education: {
    name: "education",
    description: "Education summary",
    handler: () =>
      "B.Tech / B.E. – Information Technology\n" +
      "Government Engineering College, Gandhinagar\n" +
      "2025 — CGPA 9.30 / 10\n\n" +
      "12th (English Medium) — 2022 — 90%\n\n" +
      "10th (English Medium) — 2019 — 73%",
  },
  contact: {
    name: "contact",
    description: "Contact channels",
    handler: () => mockFileSystem.contact.content as string,
  },
  recruiter: {
    name: "recruiter",
    description: "Quick review mode for recruiters",
    handler: () =>
      "Recruiter Profile View\n" +
      "────────────────────────────────\n\n" +
      "Dhrumi Vaidya\n" +
      "Frontend Engineer (Angular)\n" +
      "Ahmedabad, India\n\n" +
      "Associate Software Engineer @ Theta Technolabs\n" +
      "Experience: ~1 year (production + internships)\n\n" +
      "LinkedIn: linkedin.com/in/dhrumi-vaidya  [Open]\n\n" +
      "About\n" +
      "Frontend engineer working with Angular on production web applications.\n" +
      "Focused on building clean, responsive UIs and integrating frontend systems\n" +
      "with REST APIs. Interested in frontend structure, reusable UI patterns,\n" +
      "and reducing complexity through thoughtful design.\n\n" +
      "Experience\n" +
      "› Associate Software Engineer — Theta Technolabs\n" +
      "  Jan 2025 – Present\n" +
      "  Frontend development using Angular, API integration,\n" +
      "  UI improvements, and production bug fixes.\n\n" +
      "› Frontend Intern — Theta Technolabs\n" +
      "  Built responsive UI pages for a job portal application.\n\n" +
      "› Intern — Tatvasoft\n" +
      "  Exposure to .NET fundamentals, C#, SQL, and SDLC.\n\n" +
      "Featured Work\n" +
      "› [Job Portal Web Application (Company)]\n" +
      "› [Internal Company Web Applications]\n" +
      "› [Kutumb OS (Personal system project)]\n" +
      "› [Finance Tracker (Personal project)]\n\n" +
      "Skills\n" +
      "Angular • TypeScript • JavaScript • HTML • CSS\n" +
      "REST API Integration • Responsive UI\n" +
      "Git • GitHub • API Testing\n\n" +
      "Recent Activity\n" +
      "› Built a terminal-based developer portfolio to reflect system thinking\n" +
      "› Working on Kutumb OS — a family management platform using Angular\n" +
      "› Exploring UI structure and low-code tools for faster delivery\n\n" +
      "Contact\n" +
      "Email: dhrumi.vaidy@gmail.com\n" +
      "LinkedIn: linkedin.com/in/dhrumi-vaidya\n\n" +
      "Tip: Open LinkedIn for full profile and recommendations.\n\n" +
      "Click a project above or type:\n" +
      "projects | skills | experience",
  },
  clear: {
    name: "clear",
    description: "Clear terminal output",
    handler: () => "CLEAR_SIGNAL",
  },
};

export const processCommand = (input: string) => {
  const trimmed = input.trim();
  if (!trimmed) return null;

  const parts = trimmed.split(" ");
  const commandName = parts[0].toLowerCase();
  const rawArgs = parts.slice(1);
  const { args, flags } = getFlags(rawArgs);

  const command = commands[commandName];

  if (!command) {
    return `Command not found: ${commandName}. Type 'help' for available commands.`;
  }

  return command.handler(args, flags);
};
