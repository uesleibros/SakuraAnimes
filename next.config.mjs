/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ],
    unoptimized: false
	}
};

export default nextConfig;
