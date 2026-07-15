import { Skeleton } from "@/components/ui/skeleton";

export default function BlogLoading() {
	return (
		<main className="mx-auto max-w-3xl px-6 py-16">
			<Skeleton className="mx-auto h-12 w-48 bg-ink/10" />

			<Skeleton className="mx-auto mt-10 h-12 max-w-xl rounded-full bg-ink/10" />

			<div className="mt-10 space-y-4">
				{["skeleton-1", "skeleton-2", "skeleton-3", "skeleton-4"].map((key) => (
					<div
						key={key}
						className="rounded-xl border border-lavender-border bg-lavender p-6"
					>
						<Skeleton className="h-4 w-40 bg-ink/10" />
						<Skeleton className="mt-2 h-3 w-64 bg-ink/10" />
						<div className="mt-4 flex gap-2">
							<Skeleton className="h-5 w-12 rounded-full bg-ink/10" />
							<Skeleton className="h-5 w-12 rounded-full bg-ink/10" />
							<Skeleton className="h-5 w-12 rounded-full bg-ink/10" />
						</div>
					</div>
				))}
			</div>
		</main>
	);
}
