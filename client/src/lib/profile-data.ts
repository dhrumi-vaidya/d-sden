export type UIMode = "developer" | "recruiter" | "nonTech";

export interface ProjectSummary {
  id: string;
  name: string;
  shortDescription: string;
  nonTechDescription: string;
  imageSrc?: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  location?: string;
  duration: string;
  bullets: string[];
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface ProfileMeta {
  name: string;
  headline: string;
  nonTechIdentity: string;
  nonTechSubtext: string;
  recruiterTitle: string;
  location?: string;
  email: string;
  phone?: string;
  linkedIn: string;
  resumeUrl?: string;
}

const imagePlaceholder = "/dummy-project.png";

export const profileMeta: ProfileMeta = {
  name: "Dhrumi Vaidya",
  headline: "Frontend Engineer (Angular / UI Systems)",
  nonTechIdentity:
    "Frontend Engineer who builds fast, reliable user interfaces for real-world products.",
  nonTechSubtext:
    "I focus on how products feel, how they scale, and how they stay maintainable over time.",
  recruiterTitle: "Frontend Engineer (Angular / UI Systems)",
  location: "Ahmedabad, India",
  email: "dhrumi.vaidy@gmail.com",
  phone: "+91 84694 60710",
  linkedIn: "https://www.linkedin.com/in/dhrumi-vaidya",
  // This can be wired to a real asset later.
  resumeUrl: "/resume.pdf",
};

export const projects: ProjectSummary[] = [
  {
    id: "job-portal",
    name: "Job Portal Web Application",
    shortDescription:
      "Production job portal used to connect candidates and roles inside a real company environment.",
    nonTechDescription:
      "A job portal where people can search, filter, and view roles in a clear, simple interface.",
    imageSrc: imagePlaceholder,
    githubUrl: undefined,
    liveUrl: undefined,
  },
  {
    id: "internal-apps",
    name: "Internal Company Web Apps",
    shortDescription:
      "Internal tools and dashboards used daily inside the company to keep work moving.",
    nonTechDescription:
      "Screens and dashboards that help internal teams track work, view data, and get things done faster.",
    imageSrc: imagePlaceholder,
    githubUrl: undefined,
    liveUrl: undefined,
  },
  {
    id: "kutumb-os",
    name: "Kutumb OS — Family Management",
    shortDescription:
      "Personal system project exploring structured, role-based UIs for family coordination.",
    nonTechDescription:
      "A home base for families to share important information and stay coordinated in one place.",
    imageSrc: imagePlaceholder,
    githubUrl: undefined,
    liveUrl: undefined,
  },
  {
    id: "finance-tracker",
    name: "Finance Tracker",
    shortDescription:
      "Personal expense tracking interface with simple views for logging and reviewing spending.",
    nonTechDescription:
      "A simple, calm interface to record daily expenses and see where money is going over time.",
    imageSrc: imagePlaceholder,
    githubUrl: undefined,
    liveUrl: undefined,
  },
];

export const experience: ExperienceItem[] = [
  {
    company: "Theta Technolabs",
    role: "Associate Software Engineer — Frontend",
    location: "Ahmedabad, India",
    duration: "Jan 2025 – Present",
    bullets: [
      "Build and maintain production user interfaces used by real customers.",
      "Work closely with designers and backend engineers to ship features end to end.",
      "Improve existing screens for clarity, responsiveness, and reliability.",
      "Contribute to internal tools that teams use every day.",
    ],
  },
  {
    company: "Theta Technolabs",
    role: "Frontend Intern",
    duration: "6 months",
    bullets: [
      "Implemented pages for a job portal web application.",
      "Learned how to work within an existing codebase and follow team conventions.",
      "Shipped real features under guidance from senior engineers.",
    ],
  },
  {
    company: "Tatvasoft",
    role: "Intern",
    duration: "15 days",
    bullets: [
      "Gained exposure to how large software teams structure projects and workflows.",
      "Studied fundamentals of backend and database concepts to better understand full systems.",
    ],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    label: "Frontend",
    items: ["Semantic HTML", "Modern CSS", "Responsive layouts", "Interactive UIs"],
  },
  {
    label: "Frameworks & Libraries",
    items: ["Angular", "TypeScript", "JavaScript", "Component-driven design"],
  },
  {
    label: "Tooling",
    items: ["Git & GitHub", "REST API integration", "Basic API testing tools"],
  },
  {
    label: "Concepts",
    items: [
      "UI systems thinking",
      "Design/engineering collaboration",
      "Incremental refactoring",
      "Maintainable frontends over time",
    ],
  },
];

