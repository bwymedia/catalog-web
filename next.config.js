/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: process.env.CATALOG_DOMAIN,
          },
        ],
        destination: "/choreo/:path*",
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: process.env.DIGITALBACKDROPS_DOMAIN,
          },
        ],
        destination: "/:path*",
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: process.env.SHOWS_DOMAIN,
          },
        ],
        destination: "/shows/:path*",
      },
    ];
  },
};
