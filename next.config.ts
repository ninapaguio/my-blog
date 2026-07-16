import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	cacheComponents: true,
	cacheLife: {
		tags: {
			stale: 30,
			revalidate: 60,
			expire: 120,
		},
	},
};

export default nextConfig;
