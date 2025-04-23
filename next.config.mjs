/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "anniversary-website-photos.s3.amazonaws.com",
      "anniversary-website-photos.s3.us-east-1.amazonaws.com",
    ],
  },
};

export default nextConfig;
