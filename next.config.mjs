/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['mongodb'],
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    NEXT_PUBLIC_HOST: process.env.NEXT_PUBLIC_HOST,
  }
};

export default nextConfig;
