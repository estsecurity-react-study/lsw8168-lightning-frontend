const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

/** @type {import('next').NextConfig} */
const nextConfig = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      swcMinify: true,
      output: "standalone",
      images: {
        domains: ["lh3.googleusercontent.com", "localhost"],
      },
      async rewrites() {
        return [
          {
            source: "/:path*",
            destination: "http://localhost:4000/:path*",
          },
        ];
      },
    };
  }
  return {
    reactStrictMode: true,
    swcMinify: true,
    output: "standalone",
  };
};

module.exports = nextConfig;
