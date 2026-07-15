"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { type AddCommentState, addComment } from "./actions";

const initialState: AddCommentState = { success: false };

function SubmitButton() {
	const { pending } = useFormStatus();
	const label = pending ? "Posting..." : "Post comment";

	return (
		<button
			type="submit"
			disabled={pending}
			className="rounded-full bg-accent px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
		>
			{label}
		</button>
	);
}

function FormMessage({ state }: { state: AddCommentState }) {
	if (state.success) {
		return <p className="text-xs text-emerald-600">Comment posted.</p>;
	}

	if (state.error && !state.fieldErrors) {
		return <p className="text-xs text-red-600">{state.error}</p>;
	}

	return <span />;
}

function getAriaInvalid(hasError: boolean): true | undefined {
	if (hasError) {
		return true;
	}
	return undefined;
}

function getAriaDescribedBy(hasError: boolean, id: string): string | undefined {
	if (hasError) {
		return id;
	}
	return undefined;
}

interface CommentFormProps {
	postId: string;
}

export function CommentForm({ postId }: CommentFormProps) {
	const [state, formAction] = useActionState(addComment, initialState);
	const formRef = useRef<HTMLFormElement>(null);

	useEffect(() => {
		if (state.success) {
			formRef.current?.reset();
		}
	}, [state.success]);

	const hasAuthorNameError = Boolean(state.fieldErrors?.authorName);
	const hasBodyError = Boolean(state.fieldErrors?.body);

	return (
		<form
			ref={formRef}
			action={formAction}
			className="rounded-xl border border-lavender-border bg-lavender p-6"
		>
			<input type="hidden" name="postId" value={postId} />

			<label htmlFor="authorName" className="sr-only">
				Your name
			</label>
			<input
				id="authorName"
				name="authorName"
				type="text"
				placeholder="Enter your name..."
				className="w-full border-0 bg-transparent text-sm font-medium text-ink outline-none placeholder:text-ink/40"
				aria-invalid={getAriaInvalid(hasAuthorNameError)}
				aria-describedby={getAriaDescribedBy(
					hasAuthorNameError,
					"authorName-error",
				)}
			/>
			{hasAuthorNameError && (
				<p id="authorName-error" className="mt-1 text-xs text-red-600">
					{state.fieldErrors?.authorName?.[0]}
				</p>
			)}

			<hr className="my-3 border-lavender-border" />

			<label htmlFor="body" className="sr-only">
				Comment
			</label>
			<textarea
				id="body"
				name="body"
				rows={3}
				placeholder="Type your comment..."
				className="w-full resize-none border-0 bg-transparent text-sm text-ink outline-none placeholder:text-ink/40"
				aria-invalid={getAriaInvalid(hasBodyError)}
				aria-describedby={getAriaDescribedBy(hasBodyError, "body-error")}
			/>
			{hasBodyError && (
				<p id="body-error" className="mt-1 text-xs text-red-600">
					{state.fieldErrors?.body?.[0]}
				</p>
			)}

			<div className="mt-4 flex items-center justify-between">
				<FormMessage state={state} />
				<SubmitButton />
			</div>
		</form>
	);
}
