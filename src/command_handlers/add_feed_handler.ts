import { create_feeds, createFeedFollow } from "src/db/queries/feeds_queries";
import { UserCommandHandler } from "./command_handler";
import { users } from "src/db/schema";

import { feeds } from "src/db/schema";
export const add_feed: UserCommandHandler = async (cmdName, user, ...args) => {
    if (cmdName === "addfeed") {
        const [name, url] = args;
        if (!name || !url) {
            console.log("Error: Both feed name and URL are required.");
            process.exit(1);
        }

        const new_feed = await create_feeds(name, url, user.id);
        console.log("New feed created:", new_feed);
        await createFeedFollow(user.id, new_feed.id);
        console.log(user);
        printFeed(new_feed, user);

    }
}


export function printFeed(feed: typeof feeds.$inferSelect, user: typeof users.$inferSelect) {
    console.log("Feed Info:");
    console.log("ID:", feed.id);
    console.log("Name:", feed.name);
    console.log("URL:", feed.url);
    console.log("Created At:", feed.createdAt);
    console.log("Updated At:", feed.updatedAt);
    console.log("User:", user.name, `(ID: ${user.id})`);
}