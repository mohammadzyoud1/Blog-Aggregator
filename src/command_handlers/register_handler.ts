import { setUser } from "../config";
import { CommandHandler } from "./command_handler";
import { createUser, get_user } from "../db/queries/user_queries";

export const register_handler: CommandHandler = async (cmdName, ...args) => {
    if (cmdName === "register") {
        const [username] = args;
        if (!username) {
            console.error(`Error: a username is required.`);
            process.exit(1);
        }
        if (await get_user(username)) {
            console.error(`Error: user ${username} already exists.`);
            process.exit(1);
        }
        try {
            const user = await createUser(username);
            setUser(username);
            console.log("doneee")
        }
        catch (error) {
            throw new Error(`Failed to create user ${username}`);
        }

    }
}