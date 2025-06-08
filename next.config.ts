import type {NextConfig} from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'xdsoft.net',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
