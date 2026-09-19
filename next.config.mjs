import path from "node:path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  // The parent Vite project has its own lockfile; pin tracing to this app.
  outputFileTracingRoot: path.join(process.cwd()),
  // Legacy Vite components may still import react-router-dom — map to Next shim.
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "react-router-dom": path.join(process.cwd(), "src/components/compat/router.jsx"),
    };
    return config;
  },
};

export default nextConfig;
