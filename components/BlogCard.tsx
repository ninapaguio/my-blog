import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { TagBadge } from "@/components/TagBadge";
import type { PostSummary } from "@/lib/db/queries";
import { formatDate } from "@/lib/format";

interface BlogCardProps {
	post: PostSummary;
	commentCountSlot?: ReactNode;
}

export function BlogCard({ post, commentCountSlot }: BlogCardProps) {
	return (
		<Link href={`/blog/${post.slug}`} className="group block">
			<div className="rounded-xl border border-lavender-border bg-lavender p-6 transition-shadow hover:shadow-md">
				<div className="flex items-start justify-between gap-4">
					<div>
						<h2 className="text-sm font-bold tracking-wide wrap-break-word text-ink">
							{post.title.toUpperCase()}
						</h2>
						{post.description ? (
							<p className="mt-1 text-sm text-ink/70 wrap-break-word">
								{post.description}
							</p>
						) : null}
						<time
							dateTime={post.createdAt.toISOString()}
							className="mt-2 block text-xs text-ink/50"
						>
							{formatDate(post.createdAt)}
						</time>
					</div>
					<div className="flex shrink-0 flex-col items-end gap-2">
						{commentCountSlot}
						<span
							aria-hidden
							className="flex size-7 items-center justify-center rounded-full bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white"
						>
							<ArrowUpRight className="size-3.5" />
						</span>
					</div>
				</div>

				{post.tags.length > 0 ? (
					<div className="mt-4 flex flex-wrap gap-2">
						{post.tags.map((tag) => (
							<TagBadge key={tag} label={tag} />
						))}
					</div>
				) : null}
			</div>
		</Link>
	);
}
