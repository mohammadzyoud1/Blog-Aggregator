import { db } from "src/db";
import { CommandHandler } from "./command_handler";
import { feeds as fee } from "src/db/schema";
import {users} from "src/db/schema";
import {eq} from "drizzle-orm";
export const feeds: CommandHandler = async (cmdName, ...args) => {
    if (cmdName === "feeds") {
        const feedsList = await db.select().from(fee);
        for (const feed of feedsList) {
            const [username]= await db.select().from(users).where(eq(users.id, feed.user_id))   ;
            console.log(feed.name,'\n',feed.url,username.name);
        }
    }
}