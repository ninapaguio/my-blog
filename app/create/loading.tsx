import { Skeleton } from "@/components/ui/skeleton";

function FieldSkeleton({
	labelWidth = "w-16",
	fieldHeight = "h-[42px]",
}: {
	labelWidth?: string;
	fieldHeight?: string;
}) {
	return (
		<div>
			<Skeleton className={`h-4 ${labelWidth} bg-lavender-border`} />
			<Skeleton
				className={`mt-2 w-full ${fieldHeight} rounded-lg bg-lavender`}
			/>
		</div>
	);
}

export default function CreateBlogLoading() {
	return (
		<main
			className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-16"
			role="status"
			aria-label="Loading form"
		>
			<div className="space-y-6">
				<FieldSkeleton labelWidth="w-12" />
				<FieldSkeleton labelWidth="w-32" />

				<div>
					<Skeleton className="h-4 w-12 bg-lavender-border" />
					<div className="mt-2 flex flex-wrap gap-2">
						<Skeleton className="h-8 w-20 rounded-full bg-lavender" />
						<Skeleton className="h-8 w-16 rounded-full bg-lavender" />
						<Skeleton className="h-8 w-24 rounded-full bg-lavender" />
					</div>
				</div>

				<FieldSkeleton labelWidth="w-20" fieldHeight="h-[214px]" />
				<FieldSkeleton labelWidth="w-20" />

				<Skeleton className="h-11 w-full rounded-lg bg-accent/40" />
			</div>
			<span className="sr-only">Loading…</span>
		</main>
	);
}
