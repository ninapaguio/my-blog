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

// Post rows for the list page, narrowed to only what BlogCard or BlogListClient actually render, a route level cache
export async function getPostSummaries(): Promise<PostSummary[]> {
	return db
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
}

// Tags only change when a post is created/edited, so this is cached with a long lifetime and busted on-demand via updateTag("post-tags")
export async function getExistingTags(): Promise<string[]> {
	"use cache";
	cacheTag("post-tags");
	cacheLife("hours");

	const rows = await db.select({ tags: posts.tags }).from(posts);
	const tagSet = new Set<string>();

	for (const row of rows) {
		for (const tag of row.tags) {
			tagSet.add(tag);
		}
	}

	return Array.from(tagSet);
}

export async function getCommentCount(postId: string): Promise<number> {
	"use cache";
	cacheTag(`comments-${postId}`);
	cacheLife("minutes");

	const [row] = await db
		.select({ count: sql<number>`count(*)`.mapWith(Number) })
		.from(comments)
		.where(eq(comments.postId, postId));

	if (!row) {
		return 0;
	}

	return row.count;
}
