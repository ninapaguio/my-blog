import "server-only";
import { headers } from "next/headers";

type RuleName = "add-comment" | "create-post";

const RULES: Record<RuleName, { window: number; max: number }> = {
	"add-comment": { window: 60, max: 5 },
	"create-post": { window: 300, max: 5 },
};

type Bucket = { count: number; resetAt: number };

const store = new Map<string, Bucket>();

async function getClientIp(): Promise<string> {
	const h = await headers();
	const forwardedFor = h.get("x-forwarded-for");
	if (forwardedFor) return forwardedFor.split(",")[0].trim();
	return "unknown";
}

export interface RateLimitResult {
	allowed: boolean;
	remaining: number;
	resetAt?: number;
}

export async function checkRateLimit(rule: RuleName): Promise<RateLimitResult> {
	const { window, max } = RULES[rule];
	const ip = await getClientIp();
	const key = `${rule}:${ip}`;
	const now = Date.now();

	const bucket = store.get(key);

	if (!bucket || now > bucket.resetAt) {
		store.set(key, { count: 1, resetAt: now + window * 1000 });
		return { allowed: true, remaining: max - 1 };
	}

	if (bucket.count >= max) {
		return { allowed: false, remaining: 0, resetAt: bucket.resetAt };
	}

	bucket.count++;
	return { allowed: true, remaining: max - bucket.count };
}
