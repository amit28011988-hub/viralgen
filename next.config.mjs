/** @type {import('next').NextConfig} */
const nextConfig = {
    // Config options here
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
};

export default nextConfig;
