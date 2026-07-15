import { customAlphabet } from "nanoid";
import slugifyLib from "slugify";

// lowercade and removing numeric of nanoid' default
const nanoid = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 6);

// used for adding suffix of the url for same title and avoiding the db entry count
export function slugify(title: string): string {
	const base = slugifyLib(title, { lower: true, strict: true, trim: true });
	const suffix = nanoid();
	return base ? `${base}-${suffix}` : suffix;
}

export function formatDate(date: Date): string {
	return new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	}).format(date);
}
