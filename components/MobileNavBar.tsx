"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

interface NavLink {
	label: string;
	href: string;
}

interface MobileNavProps {
	links: NavLink[];
}

export default function MobileNav({ links }: MobileNavProps) {
	const [open, setOpen] = useState(false);

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger
				render={
					<Button
						variant="ghost"
						size="icon"
						aria-label="Open menu"
						className="md:hidden"
					/>
				}
			>
				<Menu className="h-5 w-5" aria-hidden="true" />
			</SheetTrigger>

			<SheetContent side="right" className="w-72 shadow-xl bg-white">
				<SheetHeader>
					<SheetTitle>Menu</SheetTitle>
				</SheetHeader>

				<nav aria-label="Mobile" className="mt-6 flex flex-col gap-1 px-2">
					{links.map((link) => (
						<Button
							key={link.href}
							render={<Link href={link.href} onClick={() => setOpen(false)} />}
							nativeButton={false}
							variant="ghost"
							className="justify-start px-3 py-2 text-gray-700 hover:text-gray-950"
						>
							{link.label}
						</Button>
					))}
				</nav>
			</SheetContent>
		</Sheet>
	);
}
