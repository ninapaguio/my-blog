import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
	title: "Page not found",
};

export default function NotFound() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-canvas px-6 py-16">
			<Card className="relative w-full max-w-md overflow-hidden border-lavender-border bg-lavender shadow-elevated">
				<div
					className="absolute right-0 top-0 h-7 w-7 bg-canvas shadow-elevated"
					style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
					aria-hidden="true"
				/>

				<CardContent className="p-10 text-center">
					<p className="font-display text-[5rem] leading-none text-ink">404</p>

					<p className="-mt-1 mb-6 rotate-2 font-script text-2xl text-accent">
						No Such Entry
					</p>

					<p className="mx-auto max-w-xs text-sm leading-relaxed text-ink/70">
						This entry isn't in the site. It may have been deleted, moved, or
						never written in the first place.
					</p>

					<Button
						render={<Link href="/" />}
						nativeButton={false}
						size="sm"
						variant="default"
						className="mt-8 rounded-full bg-accent px-6 text-white hover:bg-accent-hover"
					>
						Back to Home
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
