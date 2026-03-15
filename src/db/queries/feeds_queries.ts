import { db } from "../index";
import { feed_follows, users, feeds } from "../schema";
import { eq, and, asc } from 'drizzle-orm';
import Parser from 'rss-parser';
import { createPost } from "./posts_queries";
export async function create_feeds(name: string, url: string, user_id: string) {
  const [result] = await db.insert(feeds).values({ name: name, url: url, user_id: user_id }).returning();
  return result;

}

export async function createFeedFollow(user_id: string, feed_id: string) {
  const [result] = await db.insert(feed_follows).values({ user_id: user_id, feed_id: feed_id }).returning();
  return getFeedFollows();
}

export async function getFeedFollows() {

  const res = await db.select({ id: feed_follows.id, createdAt: feed_follows.createdAt, updatedAt: feed_follows.updatedAt, user_name: users.name, feed_name: feeds.name }).from(feed_follows).innerJoin(users, eq(users.id, feed_follows.user_id)).innerJoin(feeds, eq(feeds.id, feed_follows.feed_id));
  //loop to print the data of the res 
  res.forEach(element => {
    console.log("Feed Follow Info:");
    console.log("ID:", element.id);
    console.log("Created At:", element.createdAt);
    console.log("Updated At:", element.updatedAt);
    console.log("User:", element.user_name);
    console.log("Feed:", element.feed_name);
  });
  return res;
}

export async function getFeedFollowsForUser(user_id: string) {
  const res = await db.select({ user_name: users.name, feed_name: feeds.name }).from(feed_follows).innerJoin(users, eq(users.id, feed_follows.user_id)).innerJoin(feeds, eq(feeds.id, feed_follows.feed_id)).where(eq(feed_follows.user_id, user_id));
  //loop to print the data of the res
  res.forEach(element => {
    console.log("Feed Follow Info:");
    console.log("User:", element.user_name);
    console.log("Feed:", element.feed_name);
  });
  return res;
}
export async function UnfollowFeed(user_id: string, feed_id: string) {
  const [result] = await db.delete(feed_follows).where(and(eq(feed_follows.user_id, user_id), eq(feed_follows.feed_id, feed_id))).returning();
  return result;
}


export async function markFeedFetched(feed_id: string) {

  const now = new Date();
  const [result] = await db.update(feeds).set({
    lastFetchedAt: now,
    updatedAt: now,
  }).where(eq(feeds.id, feed_id)).returning();
  return result;
}

export async function getNextFeedToFetch() {
  const res = await db.select().from(feeds).orderBy(asc(feeds.lastFetchedAt)).limit(1);

  return res[0];
}

const parser = new Parser();

export async function scrapeFeeds() {
  try {
    const feed = await getNextFeedToFetch();

    if (!feed) {
      console.log("No feeds available to fetch.");
      return;
    }

    console.log(`Fetching feed: ${feed.name}`);

    // Mark feed as fetched
    await markFeedFetched(feed.id);

    const parsedFeed = await parser.parseURL(feed.url);

    for (const item of parsedFeed.items) {

      const publishedAt = item.pubDate ? new Date(item.pubDate) : new Date();

      try {
        await createPost(
          item.title ?? "No title",
          item.contentSnippet ?? item.content ?? "",
          publishedAt,
          feed.id,
          item.link ?? ""
        );
        console.log(`Saved post: ${item.title}`);
      } catch (err) {

        console.log(`Skipped post (maybe duplicate): ${item.title}`);
      }
    }

  } catch (error) {
    console.error("Error scraping feeds:", error);
  }
}