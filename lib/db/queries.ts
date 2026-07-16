import { desc, eq, sql } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { db } from "@/lib/db";
import { comments, posts } from "@/lib/db/schema";

export interface PostSummary {
	id: string;
	title: string;
	slug: string;
	description: string;
	tags: string[];
	createdAt: Date;
}

// Postgres error code for "relation/table does not exist"
const UNDEFINED_TABLE = "42P01";

function isUndefinedTableError(error: unknown): boolean {
	let current: unknown = error;
	let depth = 0;

	while (current && depth < 5) {
		if (typeof current === "object" && current !== null) {
			const code = (current as { code?: string }).code;
			if (code === UNDEFINED_TABLE) {
				return true;
			}

			const message = (current as { message?: string }).message;
			if (message?.includes("does not exist")) {
				return true;
			}

			current = (current as { cause?: unknown }).cause;
			depth++;
			continue;
		}
		break;
	}

	return false;
}

// Post rows for the list page, narrowed to only what BlogCard or BlogListClient actually render, a route level cache
export async function getPostSummaries(): Promise<PostSummary[]> {
	try {
		return await db
			.select({
				id: posts.id,
				title: posts.title,
				slug: posts.slug,
				description: posts.description,
				tags: posts.tags,
				createdAt: posts.createdAt,
			})
			.from(posts)
			.orderBy(desc(posts.createdAt));
	} catch (error) {
		if (isUndefinedTableError(error)) {
			// No migration has been run yet — treat as "no posts"
			return [];
		}
		throw error;
	}
}

// Tags only change when a post is created/edited, so this is cached with a long lifetime and busted on-demand via updateTag("post-tags")
export async function getExistingTags(): Promise<string[]> {
	"use cache";
	cacheTag("post-tags");
	cacheLife("seconds");

	try {
		const rows = await db.select({ tags: posts.tags }).from(posts);
		const tagSet = new Set<string>();

		for (const row of rows) {
			for (const tag of row.tags) {
				tagSet.add(tag);
			}
		}

		return Array.from(tagSet);
	} catch (error) {
		if (isUndefinedTableError(error)) {
			return [];
		}
		throw error;
	}
}

export async function getCommentCount(postId: string): Promise<number> {
	"use cache";
	cacheTag(`comments-${postId}`);
	cacheLife("minutes");

	try {
		const [row] = await db
			.select({ count: sql<number>`count(*)`.mapWith(Number) })
			.from(comments)
			.where(eq(comments.postId, postId));

		return row?.count ?? 0;
	} catch (error) {
		if (isUndefinedTableError(error)) {
			return 0;
		}
		throw error;
	}
}
