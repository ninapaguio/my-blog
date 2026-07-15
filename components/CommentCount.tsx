import { getCommentCount } from "@/lib/db/queries";

function pluralizeComment(count: number): string {
	if (count === 1) {
		return "comment";
	}
	return "comments";
}

interface CommentCountProps {
	postId: string;
}

export async function CommentCount({ postId }: CommentCountProps) {
	const count = await getCommentCount(postId);
	const label = pluralizeComment(count);

	return (
		<span className="text-xs text-ink/50">
			{count} {label}
		</span>
	);
}

export function CommentCountSkeleton() {
	return (
		<span className="inline-block h-3 w-16 animate-pulse rounded bg-ink/10" />
	);
}
