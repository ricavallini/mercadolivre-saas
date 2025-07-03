/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração para produção
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
};

export default nextConfig;
