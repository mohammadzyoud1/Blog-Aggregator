import { CommandHandler } from "./command_handler";
import { get_users } from "../db/queries/user_queries";
export  const users_handler: CommandHandler = async (cmdName, ...args) => {
  if (cmdName === "users") {
    await get_users();
  }
};
