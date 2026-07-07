import Link from "next/link";

const NAV_LINKS = [
	{ label: "Home", href: "/" },
	{ label: "Blog", href: "/blog" },
] as const;

/**
 * Site header: logo, primary nav, and the "Create Blog" call to action.
 * Server Component — no client state, so it ships zero JS.
 */
export default function Header() {
	return (
		<header className="border-b border-gray-200 bg-gray-50">
			<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
				<Link
					href="/"
					className="flex items-center gap-2 text-sm font-semibold text-gray-800"
				>
					<span>LOGO</span>
				</Link>

				<nav aria-label="Primary" className="flex items-center gap-8">
					<ul className="flex items-center gap-6">
						{NAV_LINKS.map((link) => (
							<li key={link.href}>
								<Link
									href={link.href}
									className="text-sm text-gray-700 transition-colors hover:text-gray-950"
								>
									{link.label}
								</Link>
							</li>
						))}
					</ul>

					<Link
						href="/blog/new"
						className="rounded-full bg-violet-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
					>
						Create Blog
					</Link>
				</nav>
			</div>
		</header>
	);
}
