import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
	title: "Access denied",
};

export default function Forbidden() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-canvas px-6 py-16">
			<Card className="relative w-full max-w-md overflow-hidden border-lavender-border bg-lavender shadow-elevated">
				<div
					className="absolute right-0 top-0 h-7 w-7 bg-canvas shadow-elevated"
					style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
					aria-hidden="true"
				/>

				<CardContent className="p-10 text-center">
					<p className="font-display text-[5rem] leading-none text-ink">403</p>

					<p className="-mt-1 mb-6 -rotate-2 font-script text-2xl text-accent">
						marked private
					</p>

					<p className="mx-auto max-w-xs text-sm leading-relaxed text-ink/70">
						This entry is locked to its author. You don't have permission to
						read it.
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
