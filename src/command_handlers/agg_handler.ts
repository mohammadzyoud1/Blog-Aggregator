import { CommandHandler } from "./command_handler";
import { scrapeFeeds } from "src/db/queries/feeds_queries";
import { parse_duration } from "src/parse_duration";
function handleError(err: unknown) {
  console.error("Error:", err);
}
export const agg_handler: CommandHandler = async (cmdName, ...args) => {
  if (cmdName === "agg") {
    const [durationStr] = args;

    if (!durationStr) {
      throw new Error("Usage: agg <time_between_reqs>");
    }

    const timeBetweenRequests = parse_duration(durationStr);

    if (!timeBetweenRequests) {
      throw new Error("Invalid duration format. Use: 1ms, 1s, 1m, 1h");
    }

    console.log(`Collecting feeds every ${durationStr}`);

    await scrapeFeeds().catch(handleError);


    const interval = setInterval(() => {
      scrapeFeeds().catch(handleError);
    }, timeBetweenRequests);


    await new Promise<void>((resolve) => {
      process.on("SIGINT", () => {
        console.log("Shutting down feed aggregator...");
        clearInterval(interval);
        resolve();
      });
    });
  }
}