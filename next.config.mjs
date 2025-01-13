/** @type {import('next').NextConfig} */
import withPlugins from "next-compose-plugins";
import withTM from "next-transpile-modules";
import withBundleAnalyzer from "@next/bundle-analyzer";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  // Append the default value with md extensions
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  webpack: (config, options) => {
    config.module.rules.push(
      // Shaders
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        use: ["raw-loader", "glslify-loader"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      }
    );

    return config;
  },
};

// Combine plugins
export default withPlugins([withTM(["three"]), bundleAnalyzer], nextConfig);
