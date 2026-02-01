import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            },
            {
                protocol: "https",
                hostname: "via.placeholder.com",
            },
        ],
    },
    experimental: {
        turbo: {
            resolveAlias: {
                canvas: "./empty-module.ts",
            },
        },
    },
};

export default nextConfig;
