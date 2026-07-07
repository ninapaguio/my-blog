import type { Metadata } from "next";
import { Caveat, Inter } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/NavBar";
import "./globals.css";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
});

const caveat = Caveat({
	subsets: ["latin"],
	weight: ["500", "600", "700"],
	variable: "--font-caveat",
	display: "swap",
});

export const metadata: Metadata = {
	title: "Blog | Let your mind do the writing",
	description: "A minimal blogging platform",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${inter.variable} ${caveat.variable}`}>
			<body className="flex min-h-screen flex-col bg-white font-sans antialiased">
				<Header />
				<main className="flex-1">{children}</main>
				<Footer />
			</body>
		</html>
	);
}
