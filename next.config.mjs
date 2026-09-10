/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Next 16 only allows quality 75 unless listed here. 90 is used for the
    // large capability service-page photo.
    qualities: [75, 90],
  },
};

export default nextConfig;
