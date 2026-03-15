import { getPostsForUser } from "src/db/queries/posts_queries";
import { UserCommandHandler } from "./command_handler";

export const browse: UserCommandHandler = async (cmdName, user, ...args) => {
  const limit = args[0] ? parseInt(args[0], 10) : 2;

  if (isNaN(limit) || limit <= 0) {
    console.log("Invalid limit provided, using default = 2");
  }

  const posts = await getPostsForUser(user.id, limit || 2);

  if (!posts.length) {
    console.log("No posts available for you.");
    return;
  }

  console.log(`Showing latest ${posts.length} posts for ${user.name}:`);

  for (const post of posts) {
    console.log(`\nTitle: ${post.title}`);
    console.log(`Feed: ${post.feed_name}`);
    console.log(`Published At: ${post.published_at}`);
    console.log(`URL: ${post.url}`);
    console.log(`Description: ${post.description}`);
  }
};