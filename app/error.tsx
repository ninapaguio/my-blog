"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ErrorPageProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="flex min-h-screen items-center justify-center bg-canvas px-6 py-16">
			<Card className="relative w-full max-w-md overflow-hidden border-lavender-border bg-lavender shadow-elevated">
				<CardContent className="p-10 text-center">
					<p className="font-display text-[3.25rem] leading-none text-ink">
						Unsaved
					</p>

					<p className="mb-6 mt-1 rotate-2 font-script text-2xl text-error">
						something went sideways
					</p>

					<p className="mx-auto max-w-xs text-sm leading-relaxed text-ink/70">
						This entry couldn't load.
					</p>

					<div className="mt-8 flex items-center justify-center gap-3">
						<Button
							onClick={reset}
							size="sm"
							variant="default"
							className="mt-8 rounded-full bg-accent px-6 text-white hover:bg-accent-hover"
						>
							Try again
						</Button>
						<Button
							render={<Link href="/" />}
							nativeButton={false}
							size="sm"
							variant="default"
							className="mt-8 rounded-full bg-accent px-6 text-white hover:bg-accent-hover"
						>
							Back to Home
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
