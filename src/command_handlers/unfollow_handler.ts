import { UnfollowFeed } from "src/db/queries/feeds_queries";
import { UserCommandHandler } from "./command_handler";

import {feeds as feed_table} from "../db/schema"    //from schema
import { db } from "src/db";
import { eq } from "drizzle-orm";

export const unfollow_handler: UserCommandHandler = async (cmdName, user, ...args) => {
        if (cmdName === "unfollow") {
        const [url] = args;
                if (!url) {
                    throw new Error("URL is required");
                }
     
   
           
            const [feed_id] = await db.select({ id: feed_table.id }).from(feed_table).where(eq(feed_table.url, url));
            await UnfollowFeed(user.id, feed_id.id);
      
        }
}