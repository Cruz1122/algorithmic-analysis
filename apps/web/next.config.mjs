/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
    // Optimizaciones para mejorar rendimiento de build
    optimizeCss: true,
    optimizePackageImports: ['lucide-react'],
  },
  transpilePackages: ["@aa/grammar", "@aa/types"],
  // Configurar caché para builds en desarrollo
  onDemandEntries: {
    // Configuración de caché para páginas
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  // Optimizaciones de compilación
  compiler: {
    // Remover console.log en producción
    removeConsole: process.env.NODE_ENV === 'production',
  },
};
export default nextConfig;
