import { CommandDefinition, FileSystemNode } from "./types";

// --- Mock Data & Content ---

export const mockFileSystem: { [key: string]: FileSystemNode } = {
  projects: {
    name: "projects",
    type: "directory",
    children: {
      "design-system": {
        name: "design-system",
        type: "file",
        description: "Enterprise component library used by 50+ squads",
        content: "Built a headless, accessible design system serving 50+ internal squads.\n\n--impact\nReduced UI debt by 40%.\nStandardized accessibility patterns across the org.\nZero-runtime CSS adoption.\n\n--infra\nStack: React, Aria, Stitches, Turborepo."
      },
      "render-engine": {
        name: "render-engine",
        type: "file",
        description: "High-performance WebGL visualization layer",
        content: "Architected a WebGL rendering engine for real-time data visualization.\n\n--impact\nHandles 1M+ data points at 60fps.\nReduced main thread blocking by 90% via Web Workers.\n\n--infra\nOptimized shader pipelines, Geometry instancing, OffscreenCanvas."
      },
      "cli-platform": {
        name: "cli-platform",
        type: "file",
        description: "Internal developer tooling platform",
        content: "Created the unified CLI for developer productivity.\n\n--impact\nReduced onboarding time from 3 days to 4 hours.\nUnified CI/CD pipelines for 200+ services.\n\n--infra\nNode.js, Rust bindings, Oclif, Ink."
      }
    }
  },
  skills: {
    name: "skills",
    type: "file",
    content: "Languages: TypeScript, Rust, Go\nFrameworks: React, Next.js, Vue\nInfrastructure: Docker, K8s, Terraform, AWS\nTools: Vite, Esbuild, Turborepo"
  },
  about: {
    name: "about",
    type: "file",
    content: "Senior Frontend Infrastructure Engineer focused on developer experience, build tooling, and design systems.\n\nI solve problems at the platform level, treating frontend as a distributed system."
  },
  arch: {
    name: "arch",
    type: "file",
    content: "Architecture Philosophy:\n1. Composition over Inheritance\n2. Platform Agnosticism\n3. Performance as a Feature\n4. Type Safety at Boundaries"
  },
  contact: {
    name: "contact",
    type: "file",
    content: "Email: dev@system.sh\nGitHub: github.com/system-dev\nTwitter: @system_dev"
  }
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
    handler: () => "Available commands: help, status, projects, skills, arch, about, contact, clear.\n\nFlags:\n  --deep    Detailed view\n  --impact  Show measurable outcomes\n  --infra   Show technical stack details",
  },
  status: {
    name: "status",
    description: "System overview / landing state",
    handler: (_args, flags) => {
      return "STATUS_COMPONENT"; 
    }
  },
  projects: {
    name: "projects",
    description: "List major systems shipped",
    handler: (args, flags) => {
      if (flags.deep) {
        return Object.entries(mockFileSystem.projects.children || {})
          .map(([name, node]) => {
             let details = node.content as string;
             // Simple parsing for flags if we wanted to be super dynamic, 
             // but for now we just show the full content in deep mode
             return `* ${name.padEnd(20)} \n  ${node.description}\n  ----------------------------------------\n  ${details}`;
          })
          .join("\n\n");
      }
      return Object.entries(mockFileSystem.projects.children || {})
        .map(([name, node]) => `* ${name.padEnd(20)} - ${node.description}`)
        .join("\n") + "\n\n(Use --deep for details)";
    }
  },
  arch: {
    name: "arch",
    description: "Frontend architecture philosophy",
    handler: () => mockFileSystem.arch.content as string
  },
  skills: {
    name: "skills",
    description: "Capability map by domain",
    handler: () => mockFileSystem.skills.content as string
  },
  about: {
    name: "about",
    description: "Concise technical profile",
    handler: () => mockFileSystem.about.content as string
  },
  contact: {
    name: "contact",
    description: "Contact channels",
    handler: () => mockFileSystem.contact.content as string
  },
  clear: {
    name: "clear",
    description: "Clear terminal output",
    handler: () => "CLEAR_SIGNAL"
  }
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
