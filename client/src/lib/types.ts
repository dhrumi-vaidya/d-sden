export interface Command {
  input: string;
  output: React.ReactNode;
  id: string;
  timestamp: number;
}

export interface FileSystemNode {
  name: string;
  type: 'file' | 'directory';
  content?: string | React.ReactNode;
  children?: { [key: string]: FileSystemNode };
  description?: string;
}

export type CommandHandler = (args: string[], flags: Record<string, boolean>) => React.ReactNode;

export interface CommandDefinition {
  name: string;
  description: string;
  handler: CommandHandler;
  usage?: string;
}
