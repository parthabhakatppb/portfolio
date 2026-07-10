import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow Three.js and R3F packages to be transpiled properly
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei", "@react-three/postprocessing"],

  // Turbopack config (Next.js 16 default bundler)
  turbopack: {},
};

export default nextConfig;
