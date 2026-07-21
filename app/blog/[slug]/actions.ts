"use server";

import { eq } from "drizzle-orm";
import { revalidatePath, updateTag } from "next/cache";
import { db } from "@/lib/db";
import { comments, posts } from "@/lib/db/schema";
import { checkRateLimit } from "@/lib/ratelimit";
import { commentSchema } from "@/lib/validations";

export interface AddCommentState {
	success: boolean;
	error?: string;
	fieldErrors?: {
		authorName?: string[];
		body?: string[];
	};
}

export async function addComment(
	_: unknown,
	formData: FormData,
): Promise<AddCommentState> {
	const { allowed } = await checkRateLimit("add-comment");
	if (!allowed) {
		return {
			success: false,
			error: "Too many attempts. Please wait a minute and try again.",
		};
	}

	const parsed = commentSchema.safeParse({
		authorName: formData.get("authorName"),
		body: formData.get("body"),
		postId: formData.get("postId"),
	});

	if (!parsed.success) {
		const fieldErrors = parsed.error.flatten().fieldErrors;
		return {
			success: false,
			error: "Please fix the errors below.",
			fieldErrors: {
				authorName: fieldErrors.authorName,
				body: fieldErrors.body,
			},
		};
	}

	const { postId, authorName, body } = parsed.data;

	const [post] = await db
		.select({ id: posts.id, slug: posts.slug })
		.from(posts)
		.where(eq(posts.id, postId));

	if (!post) {
		return { success: false, error: "This post no longer exists." };
	}

	await db.insert(comments).values({ postId, authorName, body });

	updateTag(`comments-${postId}`); // used for see immediate count of comments by the user
	revalidatePath(`/blog/${post.slug}`);
	revalidatePath("/blog");

	return { success: true };
}
