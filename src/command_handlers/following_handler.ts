import { UserCommandHandler } from "./command_handler";

import { getFeedFollowsForUser } from "src/db/queries/feeds_queries";


export const following_handler: UserCommandHandler = async (cmdName, user, ...args) => {
    if (cmdName === "following") {


        await getFeedFollowsForUser(user.id);
    }

}
