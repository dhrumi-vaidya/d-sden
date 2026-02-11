import { motion } from "framer-motion";
import { Command } from "@/lib/types";
import { Check, Cpu, Server, Layers, Zap } from "lucide-react";

// --- Specialized Result Components ---

const StatusBlock = () => (
  <div className="my-4 p-4 border border-terminal-border bg-terminal-dim/5 rounded-md max-w-2xl">
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-1 space-y-2">
        <h3 className="text-terminal-accent font-bold uppercase tracking-wider text-sm mb-3">System Status: ONLINE</h3>
        
        <div className="grid grid-cols-1 gap-2 text-sm">
           <div className="flex items-center gap-2">
              <span className="text-terminal-dim w-24">ROLE_FOCUS</span>
              <span className="text-terminal-fg font-semibold">Frontend Infrastructure / UI Platform</span>
           </div>
           <div className="flex items-center gap-2">
              <span className="text-terminal-dim w-24">DOMAINS</span>
              <span className="text-terminal-fg">Rendering, Performance, Tooling, Architecture</span>
           </div>
           <div className="flex items-center gap-2">
              <span className="text-terminal-dim w-24">UPTIME</span>
              <span className="text-terminal-fg">5 Years Commercial Exp.</span>
           </div>
        </div>
      </div>

      <div className="flex-1 border-t md:border-t-0 md:border-l border-terminal-border pt-4 md:pt-0 md:pl-6">
         <h4 className="text-terminal-dim text-xs uppercase mb-3">Core Metrics</h4>
         <div className="space-y-3">
            <Metric label="Design Systems" value="50+ Squads" icon={<Layers className="w-3 h-3" />} />
            <Metric label="Build Speed" value="-60% Latency" icon={<Zap className="w-3 h-3" />} />
            <Metric label="Platform" value="99.9% Uptime" icon={<Server className="w-3 h-3" />} />
         </div>
      </div>
    </div>
  </div>
);

const Metric = ({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) => (
  <div className="flex items-center justify-between text-sm">
    <span className="flex items-center gap-2 text-terminal-dim">
      {icon} {label}
    </span>
    <span className="text-terminal-success font-mono">{value}</span>
  </div>
);

// --- Text Formatter for Highlighting ---
const FormattedText = ({ text }: { text: string }) => {
  if (!text) return null;
  
  return (
    <>
      {text.split('\n').map((line, i) => {
        let className = "text-terminal-fg";
        if (line.trim().startsWith('--')) {
           className = "text-terminal-dim font-bold mt-2 block";
        } else if (line.trim().startsWith('*')) {
           className = "text-terminal-accent font-semibold mt-1 block";
        } else if (line.includes('Details:')) {
           className = "text-terminal-dim";
        }

        return (
          <div key={i} className={className}>
            {line}
          </div>
        );
      })}
    </>
  );
};

// --- Main Output Renderer ---

export function TerminalOutput({ history }: { history: Command[] }) {
  return (
    <div className="space-y-4">
      {history.map((cmd) => (
        <div key={cmd.id} className="mb-2">
          {/* Echo Input */}
          <div className="flex items-center gap-3 text-terminal-dim opacity-70 mb-1">
            <span className="text-terminal-accent">➜</span>
            <span className="text-terminal-success">~</span>
            <span>{cmd.input}</span>
          </div>
          
          {/* Output */}
          <motion.div 
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.1 }}
            className="pl-6 text-terminal-fg whitespace-pre-wrap leading-relaxed text-sm"
          >
            {cmd.output === "STATUS_COMPONENT" ? (
              <StatusBlock />
            ) : (
              <FormattedText text={cmd.output as string} />
            )}
          </motion.div>
        </div>
      ))}
    </div>
  );
}
