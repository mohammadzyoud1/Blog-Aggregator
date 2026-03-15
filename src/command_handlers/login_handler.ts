import { CommandHandler } from "./command_handler";
import { setUser } from "../config.js";
import { get_user } from "../db/queries/user_queries";
export const loginHandler: CommandHandler = async (cmdName, ...args) => {
  if (cmdName === "login") {
    const [username] = args;
    if (!username) {
      console.error(`Error: a username is required.`);
      process.exit(1);
    }
    const user_exist = await get_user(username)
    if (!user_exist) {
      throw new Error(`Error: user ${username} does not exist in the database.`);
    }
    setUser(username);
    console.log(`The user ${username} has been logged in.`);
  }
};
