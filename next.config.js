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
        destination: "/_domains/catalog/:path*",
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: process.env.DIGITALBACKDROPS_DOMAIN,
          },
        ],
        destination: "/_domains/digitalbackdrops/:path*",
      },
    ];
  },
};
