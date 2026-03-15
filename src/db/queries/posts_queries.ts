
import { db } from "../index"
import { feeds, posts } from "../schema";
import { desc ,eq} from "drizzle-orm";
export async function createPost( 
    title: string,
    description: string,
    published_at: Date,
    feed_id: string,
    url: string,


) {
  const [result] = await db.insert(posts).values({title, description, published_at, feed_id, url }).returning();
  return result;

}

export async function getPostsForUser(user_id: string, limit:  number = 2) {
    const result = await db.select({
      postId: posts.id,
      title: posts.title,
      description: posts.description,
      url: posts.url,
      published_at: posts.published_at,
      feed_Id: posts.feed_id,
      feed_name: feeds.name,
    })
    .from(posts)
    .innerJoin(feeds, eq(feeds.id, posts.feed_id))
    .where(eq(feeds.user_id, user_id))
    .orderBy(desc(posts.published_at)).limit(limit);
return result;
}