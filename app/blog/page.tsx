import { neon } from "@neondatabase/serverless";

async function getData() {
	const databaseUrl = process.env.DATABASE_URL;
	if (!databaseUrl) {
		throw new Error("DATABASE_URL is not defined");
	}

	const sql = neon(databaseUrl);
	const response = await sql`SELECT version()`;
	return response[0].version;
}

export default async function TestDatabasePage() {
	const data = await getData();

	return (
		<main className="p-8">
			<h1 className="text-xl font-bold mb-2">Neon Connection Test</h1>
			<p className="bg-gray-100 p-4 rounded font-mono text-sm">{data}</p>
		</main>
	);
}
