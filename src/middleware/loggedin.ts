import { readConfig } from "../config";
import { get_user } from "../db/queries/user_queries";
import { CommandHandler, UserCommandHandler } from "../command_handlers/command_handler";

export const middlewareLoggedIn =
  (handler: UserCommandHandler): CommandHandler =>
    async (cmdName: string, ...args: string[]) => {

      const config = readConfig();
      const userName = config?.currentUserName;

      if (!userName) {
        throw new Error("No user is currently logged in");
      }

      const user = await get_user(userName);

      if (!user) {
        throw new Error(`User "${userName}" not found`);
      }

      await handler(cmdName, user, ...args);
    };
