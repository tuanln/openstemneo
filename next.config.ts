import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cho phép LAN devices (điện thoại em) truy cập dev server
  allowedDevOrigins: ['192.168.1.154', '192.168.*.*'],
};

export default nextConfig;
