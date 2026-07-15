import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import MobileNav from "./MobileNavBar";

interface NavLink {
	label: string;
	href: string;
}

const NavLinks: NavLink[] = [
	{ label: "Home", href: "/" },
	{ label: "Blog", href: "/blog" },
] as const;

export default function Header() {
	return (
		<header className="sticky top-0 z-40 backdrop-blur-xl shadow-elevated">
			<div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6">
				<Image
					src="/logo.png"
					alt="Logo"
					width={150}
					height={25}
					className="h-7 w-auto sm:h-8"
					priority
				/>

				<nav aria-label="Primary" className="hidden items-center gap-3 md:flex">
					<ul className="flex items-center gap-2">
						{NavLinks.map((link) => (
							<li key={link.href}>
								<Button
									render={<Link href={link.href} />}
									nativeButton={false}
									size="xs"
									variant="ghost"
									className="bg-transparent px-3 py-2 text-gray-700 transition-colors hover:text-gray-950 focus-visible:outline-gray-400"
								>
									{link.label}
								</Button>
							</li>
						))}
					</ul>

					<Button
						render={<Link href="/create" />}
						nativeButton={false}
						size="xs"
						variant="default"
						className="rounded-full bg-accent px-3 py-2 text-white transition-colors hover:bg-accent-hover"
					>
						Create Blog
					</Button>
				</nav>

				<MobileNav links={NavLinks} />
			</div>
		</header>
	);
}
