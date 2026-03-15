import { UserCommandHandler } from "./command_handler";
import { createFeedFollow } from "src/db/queries/feeds_queries";
import { db } from "src/db";
import { users } from "src/db/schema";
import { feeds as feed_table } from "src/db/schema";
import { eq } from "drizzle-orm";

export const follow_handler: UserCommandHandler = async (cmdName, user, ...args) => {
        if (cmdName === "follow") {
                const [url] = args;
                if (!url) {
                        throw new Error("URL is required");
                }

                const [feed_id] = await db.select({ id: feed_table.id }).from(feed_table).where(eq(feed_table.url, url));
                if (!feed_id) {
                        throw new Error("Feed not found");
                }
                await createFeedFollow(user.id, feed_id.id);


        }
}