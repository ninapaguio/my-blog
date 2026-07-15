"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { BlogCard } from "@/components/BlogCard";
import { TagsCombobox } from "@/components/TagCombobox";
import type { PostSummary } from "@/lib/db/queries";

interface BlogListClientProps {
	posts: PostSummary[];
	existingTags: string[];
	commentCountSlots: Record<string, ReactNode>;
}

// Filtering happens entirely client-side. Search and tag filtering share a single control via TagsCombobox's onQueryChange
export function BlogListClient({
	posts: allPosts,
	existingTags,
	commentCountSlots,
}: BlogListClientProps) {
	const [titleQuery, setTitleQuery] = useState("");
	const [selectedTags, setSelectedTags] = useState<string[]>([]);

	const filteredPosts = useMemo(() => {
		const normalizedQuery = titleQuery.trim().toLowerCase();

		return allPosts.filter((post) => {
			const matchesQuery =
				normalizedQuery === "" ||
				post.title.toLowerCase().includes(normalizedQuery) ||
				post.description.toLowerCase().includes(normalizedQuery);

			// A post matches if it carries at least one of the selected tags.
			const matchesTags =
				selectedTags.length === 0 ||
				selectedTags.some((tag) => post.tags.includes(tag));

			return matchesQuery && matchesTags;
		});
	}, [allPosts, titleQuery, selectedTags]);

	return (
		<>
			<div className="mx-auto mt-10 max-w-xl">
				<label htmlFor="blog-search" className="sr-only">
					Search posts or filter by tag
				</label>
				<TagsCombobox
					id="blog-search"
					tags={existingTags}
					value={selectedTags}
					onValueChange={setSelectedTags}
					onQueryChange={setTitleQuery}
					placeholder="Search posts or pick a tag..."
				/>
			</div>

			<div className="mt-10 space-y-4">
				{filteredPosts.length === 0 ? (
					<p className="py-16 text-center text-sm text-ink/50">
						{titleQuery || selectedTags.length > 0
							? "No posts match your search. Try a different keyword or tag."
							: "No posts yet. Be the first to write one."}
					</p>
				) : (
					filteredPosts.map((post) => (
						<BlogCard
							key={post.id}
							post={post}
							commentCountSlot={commentCountSlots[post.id]}
						/>
					))
				)}
			</div>
		</>
	);
}
