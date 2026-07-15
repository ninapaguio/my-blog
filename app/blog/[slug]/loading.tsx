import { Skeleton } from "@/components/ui/skeleton";

function skeletonKeys(count: number, prefix: string) {
	return Array.from({ length: count }, (_, i) => `${prefix}-${i}`);
}

function CommentItemSkeleton() {
	return (
		<div className="rounded-xl border border-lavender-border bg-lavender p-6">
			<div className="flex items-baseline gap-2">
				<Skeleton className="h-4 w-24 bg-ink/10" />
				<Skeleton className="h-3 w-16 bg-ink/10" />
			</div>
			<div className="mt-3 space-y-2">
				<Skeleton className="h-3 w-full bg-ink/10" />
				<Skeleton className="h-3 w-2/3 bg-ink/10" />
			</div>
		</div>
	);
}

export default function PostLoading() {
	return (
		<main className="mx-auto max-w-3xl px-6 py-16">
			<Skeleton className="-ml-3 h-8 w-28 rounded-md bg-ink/10" />

			<Skeleton className="mx-auto mt-6 h-14 w-64 bg-ink/10" />
			<Skeleton className="mx-auto mt-8 h-3 w-48 bg-ink/10" />

			<div className="mt-6 flex items-center justify-between border-b border-ink/10 pb-4">
				<div className="flex gap-2">
					<Skeleton className="h-5 w-12 rounded-full bg-ink/10" />
					<Skeleton className="h-5 w-12 rounded-full bg-ink/10" />
				</div>
				<Skeleton className="h-3 w-20 bg-ink/10" />
			</div>

			<div className="mt-6 space-y-2">
				{skeletonKeys(5, "body-line").map((key) => (
					<Skeleton key={key} className="h-3 w-full bg-ink/10" />
				))}
			</div>

			<section className="mt-20">
				<Skeleton className="h-9 w-40 bg-ink/10" />

				<div className="mt-6 rounded-xl border border-lavender-border bg-lavender p-6">
					<Skeleton className="h-4 w-32 bg-ink/10" />
					<div className="my-3 border-t border-lavender-border" />
					<div className="space-y-2">
						<Skeleton className="h-3 w-full bg-ink/10" />
						<Skeleton className="h-3 w-5/6 bg-ink/10" />
					</div>
					<div className="mt-4 flex items-center justify-between">
						<span />
						<Skeleton className="h-9 w-32 rounded-full bg-ink/10" />
					</div>
				</div>

				<div className="mt-4 space-y-4">
					{skeletonKeys(3, "comment").map((key) => (
						<CommentItemSkeleton key={key} />
					))}
				</div>
			</section>
		</main>
	);
}
