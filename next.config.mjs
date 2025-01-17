/** @type {import('next').NextConfig} */
import withPlugins from "next-compose-plugins";
import withTM from "next-transpile-modules";
import withBundleAnalyzer from "@next/bundle-analyzer";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ["raw-loader", "glslify-loader"],
    });

    return config;
  },
};

// Combine plugins
export default withPlugins([bundleAnalyzer], nextConfig);
