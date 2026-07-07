import Link from "next/link";

export default function HomePage() {
	return (
		<section className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
			<h1 className="font-display leading-[0.95] text-gray-950">
				<span className="block text-6xl sm:text-7xl">
					Let your <span className="text-7xl sm:text-8xl">MIND</span>
				</span>
				<span className="block text-6xl sm:text-7xl">
					Do the <span className="text-7xl sm:text-8xl">WRITING</span>
				</span>
			</h1>

			<div className="mt-10 flex items-center gap-4">
				<Link
					href="/blog/new"
					className="rounded-full bg-violet-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-violet-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
				>
					Create Blog
				</Link>
				<Link
					href="/blog"
					className="rounded-full border border-violet-200 bg-violet-50 px-6 py-2.5 text-sm font-medium text-violet-700 transition-colors hover:bg-violet-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
				>
					View Blog
				</Link>
			</div>
		</section>
	);
}
