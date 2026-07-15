import type { Metadata } from "next";
import { getExistingTags } from "@/lib/db/queries";
import { CreateBlogForm } from "./create-blog-form";

export const metadata: Metadata = {
	title: "Create Blog",
	description: "Publish a new post to the blog.",
	robots: {
		index: false,
		follow: false,
	},
};

export default async function CreateBlogPage() {
	const existingTags = await getExistingTags();

	return (
		<main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-16">
			<CreateBlogForm existingTags={existingTags} />
		</main>
	);
}
