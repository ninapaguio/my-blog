"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { TagInput } from "@/components/TagInput";
import { Button } from "@/components/ui/button";
import { type CreatePostState, createPost } from "./action";

const initialState: CreatePostState = { success: false };

interface CreateBlogFormProps {
	existingTags: string[];
}

function SubmitButton() {
	const { pending } = useFormStatus();

	return (
		<Button
			type="submit"
			disabled={pending}
			nativeButton={true}
			variant="default"
			size="default"
			className="w-full rounded-lg bg-accent py-3 text-sm font-semibold normal-case tracking-normal text-white hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
		>
			{pending ? "Posting..." : "Post"}
		</Button>
	);
}

export function CreateBlogForm({ existingTags }: CreateBlogFormProps) {
	const [state, formAction] = useActionState(createPost, initialState);

	return (
		<form action={formAction} className="space-y-6">
			<div>
				<label htmlFor="title" className="block text-sm font-medium text-ink">
					Title:
				</label>
				<input
					id="title"
					name="title"
					type="text"
					placeholder="Type your title..."
					className="label-style"
					aria-invalid={state.fieldErrors?.title ? true : undefined}
				/>
				{state.fieldErrors?.title ? (
					<p className="mt-1 text-xs text-red-600">
						{state.fieldErrors.title[0]}
					</p>
				) : null}
			</div>

			<div>
				<label
					htmlFor="description"
					className="block text-sm font-medium text-ink"
				>
					Short description:
				</label>
				<input
					id="description"
					name="description"
					type="text"
					placeholder="Short description that shows up on the blog list..."
					className="label-style"
					aria-invalid={state.fieldErrors?.description ? true : undefined}
				/>
				{state.fieldErrors?.description ? (
					<p className="mt-1 text-xs text-red-600">
						{state.fieldErrors.description[0]}
					</p>
				) : null}
			</div>

			<div>
				<label htmlFor="tags" className="block text-sm font-medium text-ink">
					Tags:
				</label>
				<div className="mt-2">
					<TagInput name="tags" existingTags={existingTags} />
				</div>
				{state.fieldErrors?.tags ? (
					<p className="mt-1 text-xs text-red-600">
						{state.fieldErrors.tags[0]}
					</p>
				) : null}
			</div>

			<div>
				<label htmlFor="body" className="block text-sm font-medium text-ink">
					Content:
				</label>
				<textarea
					id="body"
					name="body"
					rows={10}
					placeholder="Type your content here..."
					className="resize-none label-style"
					aria-invalid={state.fieldErrors?.body ? true : undefined}
				/>
				{state.fieldErrors?.body ? (
					<p className="mt-1 text-xs text-red-600">
						{state.fieldErrors.body[0]}
					</p>
				) : null}
			</div>

			<div>
				<label
					htmlFor="password"
					className="block text-sm font-medium text-ink"
				>
					Password:
				</label>
				<input
					id="password"
					name="password"
					type="password"
					placeholder="Enter the password"
					className="label-style"
					aria-invalid={state.fieldErrors?.password ? true : undefined}
				/>
				{state.fieldErrors?.password ? (
					<p className="mt-1 text-xs text-red-600">
						{state.fieldErrors.password[0]}
					</p>
				) : null}
			</div>

			{state.error && !state.fieldErrors ? (
				<p className="text-sm text-red-600">{state.error}</p>
			) : null}

			<SubmitButton />
		</form>
	);
}
