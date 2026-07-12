import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**',
      },
    ],
  },
  webpack: (config: unknown, { isServer }: { isServer: boolean }) => {
    const webpackConfig = config as { resolve?: { fallback?: Record<string, boolean | string> } };
    if (!isServer) {
      if (!webpackConfig.resolve) {
        webpackConfig.resolve = {};
      }
      webpackConfig.resolve.fallback = {
        ...(webpackConfig.resolve.fallback || {}),
        fs: false,
        path: false,
        url: false,
      };
    }
    return webpackConfig;
  },
};

const withNextIntl = createNextIntlPlugin('./src/shared/config/i18n/request.ts');
export default withNextIntl(nextConfig);
