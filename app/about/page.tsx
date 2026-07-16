import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
	title: "About",
	description: "A few words about this blog and who writes it.",
};

export default function AboutPage() {
	return (
		<main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24">
			<h1 className="text-center font-black text-4xl text-ink sm:text-5xl">
				About
			</h1>

			<div className="mt-10 text-justify space-y-6 text-sm leading-relaxed text-ink/80 sm:text-base">
				<p>
					This is a personal space for writing things down some are half-formed
					ideas, things I'm learning, and the occasional story that wouldn't
					leave me alone until I wrote it.
				</p>
				<p>
					There's no SEO strategy — just posts whenever there's something worth
					sharing. Some are short, some ramble a bit, and that's fine.
				</p>
				<p>
					If something resonates, feel free to leave a comment on the post. I
					read every one.
				</p>
			</div>

			<div className="mt-12 flex justify-center">
				<Button
					render={<Link href="/blog" />}
					nativeButton={false}
					size="sm"
					variant="default"
					className="rounded-full bg-accent text-white hover:bg-accent-hover"
				>
					Read the blog
					<ArrowRight className="size-4" aria-hidden />
				</Button>
			</div>
		</main>
	);
}
