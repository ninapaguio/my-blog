import { Skeleton } from "@/components/ui/skeleton";

export default function AboutLoading() {
	return (
		<main
			className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24"
			role="status"
			aria-label="Loading about page"
		>
			<Skeleton className="mx-auto h-10 w-32 bg-ink/10 sm:h-12 sm:w-40" />

			<div className="mt-10 space-y-3">
				<Skeleton className="h-3 w-full bg-ink/10" />
				<Skeleton className="h-3 w-full bg-ink/10" />
				<Skeleton className="h-3 w-2/3 bg-ink/10" />
			</div>

			<div className="mt-6 space-y-3">
				<Skeleton className="h-3 w-full bg-ink/10" />
				<Skeleton className="h-3 w-5/6 bg-ink/10" />
			</div>

			<div className="mt-6 space-y-3">
				<Skeleton className="h-3 w-full bg-ink/10" />
				<Skeleton className="h-3 w-1/2 bg-ink/10" />
			</div>

			<div className="mt-12 flex justify-center">
				<Skeleton className="h-10 w-36 rounded-full bg-accent/40" />
			</div>

			<span className="sr-only">Loading…</span>
		</main>
	);
}
