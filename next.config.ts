import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.100.27", "192.168.137.135"],
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "austratraininginstitute.co.ke" }],
        destination: "https://www.austratraininginstitute.co.ke/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
