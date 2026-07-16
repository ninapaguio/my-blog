import { z } from "zod";

export const commentSchema = z.object({
	authorName: z
		.string()
		.trim()
		.min(1, "Name is required")
		.max(80, "Name must be 80 characters or fewer"),
	body: z
		.string()
		.trim()
		.min(10, "Comment must be at least 10 characters")
		.max(2000, "Comment must be 2000 characters or fewer"),
	postId: z.string().uuid("Invalid post"),
});

export type CommentInput = z.infer<typeof commentSchema>;

export const createPostSchema = z.object({
	title: z
		.string()
		.trim()
		.min(1, "Title is required")
		.max(200, "Title must be 200 characters or fewer"),
	description: z
		.string()
		.trim()
		.min(50, "Short description must be at least 50 characters")
		.max(500, "Short description must be 500 characters or fewer"),
	body: z.string().trim().min(750, "Content must be at least 750 characters"),
	tags: z
		.array(z.string().trim().min(1).max(30))
		.max(5, "Use 5 tags or fewer")
		.default([]),
	password: z.string().min(1, "Password is required"),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
