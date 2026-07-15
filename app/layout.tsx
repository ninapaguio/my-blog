import type { Metadata } from "next";
import { Caveat, Inter, Playfair_Display } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "./globals.css";

const playfair = Playfair_Display({
	subsets: ["latin"],
	variable: "--font-display",
	display: "swap",
});

const caveat = Caveat({
	subsets: ["latin"],
	variable: "--font-script",
	display: "swap",
});

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
	display: "swap",
});

export const metadata: Metadata = {
	title: {
		default: "Blog",
		template: "%s | Blog",
	},
	description: "A blog built with Next.js, Drizzle, and Neon.",
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body
				className={`${playfair.variable} ${caveat.variable} ${inter.variable} flex min-h-screen flex-col antialiased`}
			>
				<Header />
				<div className="flex-1">{children}</div>
				<Footer />
			</body>
		</html>
	);
}
