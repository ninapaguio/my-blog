import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const databaseUrl = process.env.DATABASE_URL; // the process.env.DATABASE_URL! won't work here because the type of it is string | undefined
if (!databaseUrl) {
	throw new Error("Connection is not defined");
}
const sql = neon(databaseUrl);

export const db = drizzle({ client: sql, schema });
