import { desc, eq } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
	ReadingThemeProvider,
	ReadingThemeToggle,
} from "@/components/BlogTheme";
import { CommentItem } from "@/components/CommentItem";
import { TagBadge } from "@/components/TagBadge";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { comments, posts } from "@/lib/db/schema";
import { formatDate } from "@/lib/format";
import { CommentForm } from "./comment-form";

interface PostPageProps {
	params: Promise<{ slug: string }>;
}

type Post = NonNullable<Awaited<ReturnType<typeof getPost>>>;
type Comment = Awaited<ReturnType<typeof getPostComments>>[number];

async function getPost(slug: string) {
	const [post] = await db.select().from(posts).where(eq(posts.slug, slug));
	return post ?? null;
}

async function getPostComments(postId: string) {
	return db
		.select()
		.from(comments)
		.where(eq(comments.postId, postId))
		.orderBy(desc(comments.createdAt));
}

export async function generateMetadata({
	params,
}: PostPageProps): Promise<Metadata> {
	const { slug } = await params;
	const post = await getPost(slug);
	if (!post) {
		return { title: "Post not found" };
	}
	return { title: post.title, description: post.description };
}

function PostDescription({
	description,
}: {
	description: Post["description"];
}) {
	if (!description) {
		return null;
	}

	return (
		<p className="mt-8 text-center text-sm italic text-ink/70">{description}</p>
	);
}

function CommentsSection({ comments }: { comments: Comment[] }) {
	if (comments.length === 0) {
		return (
			<p className="mt-6 text-sm text-ink/50">
				No comments yet. Be the first to say something.
			</p>
		);
	}

	return (
		<div className="mt-4 space-y-4">
			{comments.map((comment) => (
				<CommentItem key={comment.id} comment={comment} />
			))}
		</div>
	);
}

export default async function PostPage({ params }: PostPageProps) {
	const { slug } = await params;

	const post = await getPost(slug);
	if (!post) {
		notFound();
	}

	const postComments = await getPostComments(post.id);

	return (
		<ReadingThemeProvider>
			<main className="mx-auto max-w-3xl px-6 py-16">
				<div className="flex items-center justify-between">
					<Button
						render={<Link href="/blog" />}
						nativeButton={false}
						size="xs"
						variant="ghost"
						className="-md-3 text-ink"
					>
						<ArrowLeft className="size-3" aria-hidden />
						Back to blog
					</Button>

					<ReadingThemeToggle />
				</div>

				<h1 className="mt-6 text-center font-script text-6xl text-ink">
					{post.title}
				</h1>

				<PostDescription description={post.description} />

				<div className="mt-6 flex items-center justify-between border-b border-ink/80 pb-4">
					<div className="flex flex-wrap gap-2">
						{post.tags.map((tag) => (
							<TagBadge key={tag} label={tag} />
						))}
					</div>
					<time
						dateTime={post.createdAt.toISOString()}
						className="shrink-0 text-xs text-ink/50"
					>
						{formatDate(post.createdAt)}
					</time>
				</div>

				<article className="mt-6 text-sm leading-relaxed whitespace-pre-wrap text-ink/90">
					{post.body}
				</article>

				<section className="mt-20">
					<h2 className="text-3xl font-bold text-ink">Comments</h2>

					<div className="mt-6">
						<CommentForm postId={post.id} />
					</div>

					<CommentsSection comments={postComments} />
				</section>
			</main>
		</ReadingThemeProvider>
	);
}
