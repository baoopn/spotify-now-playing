/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.scdn.co',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'cdn.baoopn.com',
                port: '',
                pathname: '/**',
            },
        ],
        loader: 'imgix', // or 'cloudinary', 'akamai', etc.
        path: '',
    },
    output: 'export',
};

export default nextConfig;