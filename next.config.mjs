/**
 * Content Security Policy.
 *
 * `script-src` has to allow inline script: Next injects its own bootstrap
 * inline, and the organisation JSON-LD in app/layout.tsx is an inline tag.
 * That weakens the script rule against an injected inline payload, but the
 * policy still blocks scripts loaded from any other origin, which is the
 * realistic risk for a site with no third-party embeds. Tightening this to
 * nonces means generating one per request in middleware — worth doing if
 * third-party scripts are ever added.
 *
 * Fonts are self-hosted: next/font downloads Montserrat and Inter at build
 * time and serves them from /_next, so no Google origin is needed at runtime.
 *
 * Three relaxations apply in development only, and none of them ship:
 *
 * - `'unsafe-eval'`, because React's dev build uses eval() for debugging
 *   features such as reconstructing callstacks. React never uses eval() in
 *   production.
 * - `ws:` in connect-src, for the hot-reload socket.
 * - no `upgrade-insecure-requests`, which would rewrite that `ws://localhost`
 *   socket to `wss://` and break hot reload over plain http.
 */
const isDev = process.env.NODE_ENV === "development";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  `connect-src 'self'${isDev ? " ws:" : ""}`,
  "form-action 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // Belt and braces with frame-ancestors, for anything that predates CSP.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

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
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
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
