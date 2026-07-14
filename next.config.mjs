/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: [
        "**/node_modules/**",
        "**/.git/**",
        "**/.next/**",
        "**/.npm-cache/**"
      ]
    };

    return config;
  }
};

export default nextConfig;
