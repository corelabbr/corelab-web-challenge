import type { NextConfig } from "next";

// Permite configurar o alvo do proxy via variável de ambiente.
// Em Docker, use API_ORIGIN=http://backend:3001
// Localmente, o padrão é http://localhost:3001
const API_ORIGIN = process.env.API_ORIGIN || 'http://localhost:3001';

const nextConfig: NextConfig = {
    async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${API_ORIGIN}/api/:path*`,
      },
    ]
  },
};

export default nextConfig;
