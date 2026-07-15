import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
	return (
		<main className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
			<h1 className="font-display leading-[0.95] text-gray-950">
				<span className="block text-8xl sm:text-7xl">
					Let your <span className="text-6xl sm:text-8xl">MIND</span>
				</span>
				<span className="block text-8xl sm:text-7xl">
					Do the <span className="text-6xl sm:text-8xl">WRITING</span>
				</span>
			</h1>
			<p className="mt-6 font-sans text-base text-ink/70 md:text-lg italic">
				Every thought has a story. This is where I write mine.
			</p>
			<Button
				render={<Link href="/blog" />}
				nativeButton={false}
				size="xs"
				variant="default"
				className="mt-8 rounded-full bg-accent px-6 text-white hover:bg-accent-hover"
			>
				Read Blogs
			</Button>
		</main>
	);
}
