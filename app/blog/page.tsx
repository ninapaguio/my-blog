import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { BlogListClient } from "@/components/BlogListClient";
import { CommentCount, CommentCountSkeleton } from "@/components/CommentCount";
import { getExistingTags, getPostSummaries } from "@/lib/db/queries";

export const metadata: Metadata = {
	title: "Blog",
	description:
		"Blog list — search by title or filter by tag to find what you're after.",
};

export default async function BlogPage() {
	const [rows, existingTags] = await Promise.all([
		getPostSummaries(),
		getExistingTags(),
	]);

	const commentCountSlots: Record<string, ReactNode> = {};
	for (const post of rows) {
		commentCountSlots[post.id] = (
			<Suspense fallback={<CommentCountSkeleton />}>
				<CommentCount postId={post.id} />
			</Suspense>
		);
	}

	return (
		<main className="mx-auto max-w-3xl px-6 py-16">
			<h1 className="text-center text-5xl font-black text-tag tracking-tight">
				BLOGS
			</h1>

			<BlogListClient
				posts={rows}
				existingTags={existingTags}
				commentCountSlots={commentCountSlots}
			/>
		</main>
	);
}
