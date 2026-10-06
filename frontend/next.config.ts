import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  async rewrites() {
    // Só em desenvolvimento (docker compose de dev).
    // Em produção, quem roteia /api é o proxy, não o Next.
    if (process.env.NODE_ENV !== 'development') return [];
    return [
      {
        source: '/api/health',
        destination: 'http://backend:8000/api/health/',
      },
    ];
  },
};

export default nextConfig;