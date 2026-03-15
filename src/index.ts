// main.ts
import { readConfig, Config } from "./config";
import { runCommand } from "./command_handlers/command_handler";
import { registerCommand } from "./command_handlers/command_handler";
import { register_handler } from "./command_handlers/register_handler";
import { loginHandler } from "./command_handlers/login_handler";
import { resetHandler } from "./command_handlers/reset_handler";
import { users_handler } from "./command_handlers/users_handler";
import { agg_handler } from "./command_handlers/agg_handler";
import { add_feed } from "./command_handlers/add_feed_handler";
import { feeds } from "./command_handlers/feeds_handler";
import { follow_handler } from "./command_handlers/follow_handler";
import { following_handler } from "./command_handlers/following_handler";
import { middlewareLoggedIn } from "./middleware/loggedin";
import { unfollow_handler } from "./command_handlers/unfollow_handler";
import { browse } from "./command_handlers/browse_handler";
async function main() {

  registerCommand("login", loginHandler);
  registerCommand("register", register_handler);
  registerCommand("reset", resetHandler);
  registerCommand("users", users_handler);
  registerCommand("agg", agg_handler);
  registerCommand("addfeed", middlewareLoggedIn(add_feed))
  registerCommand("feeds", feeds)
  registerCommand("follow", middlewareLoggedIn(follow_handler));
  registerCommand("following", middlewareLoggedIn(following_handler));
  registerCommand("unfollow", middlewareLoggedIn(unfollow_handler));
  registerCommand("browse", middlewareLoggedIn(browse));
  const cmdName = process.argv[2];
  const args = process.argv.slice(3);

  if (process.argv.length < 3) {
    console.error(`Error: Not enough arguments were provided.`);
    process.exit(1);
  }
  if (!cmdName) {
    console.error("Error: No command provided.");
    process.exit(1); // exit with code 1
  }




  await runCommand(cmdName, ...args);

  const config: Config | null = readConfig();



  process.exit(0)
}

// Run the main function
main();

