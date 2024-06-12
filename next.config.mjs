/** @type {import('next').NextConfig} */
const nextConfig = {
  //placeholder only, lets update images to come from proper place
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
