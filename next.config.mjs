/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Next 16 only allows quality 75 unless listed here. 90 is used for the
    // large capability service-page photo.
    qualities: [75, 90],
  },
  // Capability slugs renamed when the page was restructured into Products and
  // Services. Permanent redirects keep any existing links and search results
  // working instead of 404ing.
  async redirects() {
    return [
      {
        source: "/capabilities/explosives-distribution",
        destination: "/capabilities/explosives-manufacture-supply",
        permanent: true,
      },
      {
        source: "/capabilities/reagents-fertilizers",
        destination: "/capabilities/fertilizer-reagents",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
