import { CommandHandler } from "./command_handler";
import { delete_users } from "../db/queries/user_queries";
export  const resetHandler: CommandHandler = async (cmdName, ...args) => {
  if (cmdName === "reset") {
    await delete_users();
  }
};
