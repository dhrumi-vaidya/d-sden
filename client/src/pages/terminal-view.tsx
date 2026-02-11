import { Terminal } from "@/components/terminal/Terminal";

export default function TerminalPage() {
  let initialCommand: string | undefined;
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get("mode");
    if (mode === "recruiter") {
      initialCommand = "recruiter";
    }
  }

  return (
    <Terminal initialCommand={initialCommand} />
  );
}
