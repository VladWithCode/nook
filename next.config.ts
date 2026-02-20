import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            new URL("https://utfs.io/**"),
        ],
    },
    output: "standalone",
};

export default nextConfig;
