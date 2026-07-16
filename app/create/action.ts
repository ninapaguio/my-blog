"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { slugify } from "@/lib/format";
import { verifyPostPassword } from "@/lib/postpassword";
import { checkRateLimit } from "@/lib/ratelimit";
import { createPostSchema } from "@/lib/validations";

export interface CreatePostState {
	success: boolean;
	error?: string;
	fieldErrors?: {
		title?: string[];
		description?: string[];
		body?: string[];
		tags?: string[];
		password?: string[];
	};
}

export async function createPost(
	_: unknown,
	formData: FormData,
): Promise<CreatePostState> {
	const { allowed } = await checkRateLimit("create-post");
	if (!allowed) {
		return {
			success: false,
			error: "Too many attempts. Please wait a few minutes and try again.",
		};
	}

	let tags: string[] = [];
	try {
		const raw = formData.get("tags");
		tags = raw ? JSON.parse(raw as string) : [];
	} catch {
		return { success: false, error: "Tags were malformed." };
	}

	const parsed = createPostSchema.safeParse({
		title: formData.get("title"),
		description: formData.get("description"),
		body: formData.get("body"),
		tags,
		password: formData.get("password"),
	});

	if (!parsed.success) {
		return {
			success: false,
			error: "Please fix the errors below.",
			fieldErrors: parsed.error.flatten().fieldErrors,
		};
	}

	if (!verifyPostPassword(parsed.data.password)) {
		return {
			success: false,
			error: "Incorrect password.",
			fieldErrors: { password: ["Incorrect password"] },
		};
	}

	const slug = slugify(parsed.data.title);

	const [post] = await db
		.insert(posts)
		.values({
			title: parsed.data.title,
			slug,
			description: parsed.data.description,
			body: parsed.data.body,
			tags: parsed.data.tags,
		})
		.returning();

	// to see immediately the tags
	updateTag("post-tags");
	revalidatePath("/blog");

	redirect(`/blog/${post.slug}`);
}
