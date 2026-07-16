import type { comments } from "@/lib/db/schema";
import { formatDate } from "@/lib/format";

interface CommentItemProps {
	comment: typeof comments.$inferSelect;
}

export function CommentItem({ comment }: CommentItemProps) {
	return (
		<div className="rounded-xl border border-lavender-border bg-lavender p-4 sm:p-6">
			<div className="flex items-baseline gap-2">
				<span className="font-semibold text-sm text-ink wrap-break-word">
					{comment.authorName}
				</span>
				<span className="text-xs text-ink/50">
					{formatDate(comment.createdAt)}
				</span>
			</div>
			<p className="mt-2 text-xs whitespace-pre-wrap wrap-break-word text-ink/80">
				{comment.body}
			</p>
		</div>
	);
}
