import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pr51orq9iy.ufs.sh",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "gravatar.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
