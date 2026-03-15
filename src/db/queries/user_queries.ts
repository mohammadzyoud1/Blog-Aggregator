import { db } from "../index";
import { users } from "../schema";
import { eq } from 'drizzle-orm';
import { readConfig } from "../../config";
export async function createUser(name: string) {
    const [result] = await db.insert(users).values({ name: name }).returning();
    return result;

}
export async function get_user(name: string) {
    try {
        const [result] = await db.select().from(users).where(eq(users.name, name));
        return result;
    }
    catch (err) {
        console.error("DB ERROR:", err);
        throw err;
    }
}
export async function delete_users() {
    try {

        await db.execute(`TRUNCATE TABLE users RESTART IDENTITY CASCADE`);

        console.log("All users deleted successfully");
        process.exit(0);
    } catch (err) {
        console.error("Failed to delete users:", err);
        process.exit(1);
    }
}
export async function get_users() {
    const config = readConfig(); // get current logged-in user
    const currentUser = config?.currentUserName;
    try {
        const results = await db.select().from(users);
        for (const user of results) {
            if (user.name !== currentUser) { console.log(user.name); }
            else {
                console.log(`${user.name} (current)`);
            }
        }
    } catch (err) {
        console.error("Failed to get users:", err);
        throw err;
    }
}