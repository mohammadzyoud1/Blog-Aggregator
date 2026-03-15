# Blog CLI

A command-line RSS feed aggregator and browser built with TypeScript and PostgreSQL.

## Setup

**Clone the repo**

git clone <\repo-url\>
cd blog

**Install dependencies**

npm install

**Create a PostgreSQL database**
Example URL:

```
postgres://username:password@localhost:5432/dbname?sslmode=disable
```

5. **Run migrations**

npm run migrate

## Commands

- **create a new user**

npm run start register <\username\>

- **login user**

npm run start login <\username\>

- **Add a feed**

npm run start addfeed "Feed Name" "Feed URL"

- **Follow a feed**

npm run start follow "Feed URL"

- **UnFollow a feed**
  npm run start unfollow "Feed URL"

- **show the feeds followed by the user**
  npm run start following

- **Browse latest posts (default limit 2)**

npm run start browse

- **Browse latest posts (custom limit)**

npm run start browse 5

- **Start aggregator (fetch interval)**

npm run start agg 1m

> Aggregator prints new posts automatically and respects duplicates. Press `CTRL+C` to stop.

## Notes

- Feeds are fetched continuously by the aggregator.
- Posts are stored in PostgreSQL.
- User must be set in `config.json` to use commands.
  .
