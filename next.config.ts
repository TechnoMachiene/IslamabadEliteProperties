import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "hmgmstsjuqfazrhioady.supabase.co" },
      { protocol: "https", hostname: "islamabadeliteproperties.com" },
      { protocol: "https", hostname: "www.islamabadeliteproperties.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },

  output: "standalone",

  async redirects() {
    return [
      // www -> apex
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.islamabadeliteproperties.com" }],
        destination: "https://islamabadeliteproperties.com/:path*",
        permanent: true,
      },
      // old .pk domain -> new .com
      {
        source: "/:path*",
        has: [{ type: "host", value: "islamabadelite.pk" }],
        destination: "https://islamabadeliteproperties.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.islamabadelite.pk" }],
        destination: "https://islamabadeliteproperties.com/:path*",
        permanent: true,
      },
      // legacy /properties/f-x -> /islamabad/f-x
      { source: "/twin-cities", destination: "/", permanent: true },
      { source: "/properties/f-6", destination: "/islamabad/f-6", permanent: true },
      { source: "/properties/f-7", destination: "/islamabad/f-7", permanent: true },
      { source: "/properties/f-8", destination: "/islamabad/f-8", permanent: true },
      { source: "/properties/f-6/:sub", destination: "/islamabad/f-6/:sub", permanent: true },
      { source: "/properties/f-7/:sub", destination: "/islamabad/f-7/:sub", permanent: true },
      { source: "/properties/f-8/:sub", destination: "/islamabad/f-8/:sub", permanent: true },
      // short aliases
      { source: "/f6", destination: "/islamabad/f-6", permanent: true },
      { source: "/f7", destination: "/islamabad/f-7", permanent: true },
      { source: "/f8", destination: "/islamabad/f-8", permanent: true },
      { source: "/f6/:sub", destination: "/islamabad/f-6/:sub", permanent: true },
      { source: "/f7/:sub", destination: "/islamabad/f-7/:sub", permanent: true },
      { source: "/f8/:sub", destination: "/islamabad/f-8/:sub", permanent: true },
    ];
  },
};

export default nextConfig;
