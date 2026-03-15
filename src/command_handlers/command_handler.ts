import { users } from "../db/schema";
export type CommandHandler = (cmdName: string,
    ...args: string[]) => Promise<void>;

export type UserCommandHandler = (
    cmdName: string,
    user: typeof users.$inferSelect,
    ...args: string[]
) => Promise<void>;

export const CommandsRegistry: Record<string, CommandHandler> = {
};
export async function registerCommand(name: string, handler: CommandHandler) {
    CommandsRegistry[name] = handler;
}
export async function runCommand(name: string, ...args: string[]) {
    const handler = CommandsRegistry[name];
    if (handler) {
        await handler(name, ...args);
    }
}