import "server-only";
import { timingSafeEqual } from "node:crypto";

export function verifyPostPassword(input: string): boolean {
	const expected = process.env.BLOG_PASSWORD;
	if (!expected) return false;

	const a = Buffer.from(input);
	const b = Buffer.from(expected);

	if (a.length !== b.length) return false;

	return timingSafeEqual(a, b);
}
