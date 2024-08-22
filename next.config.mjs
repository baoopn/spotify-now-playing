/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	// Ensure pages are statically generated.
	// Avoid getServerSideProps or other SSR-specific features.
	output: 'serverless',

	env: {
		REACT_APP_SPOTIFY_CLIENT_ID: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
		REACT_APP_SPOTIFY_CLIENT_SECRET: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
		REACT_APP_SPOTIFY_REFRESH_TOKEN: process.env.REACT_APP_SPOTIFY_REFRESH_TOKEN,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'i.scdn.co',
				port: '',
				pathname: '/**',
			},
		],
		loader: 'imgix', // or 'cloudinary', 'akamai', etc.
		path: '',
	},
};

export default nextConfig;
