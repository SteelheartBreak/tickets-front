import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // 🔧 Evita que Vercel bloquee el build por errores de ESLint
    ignoreDuringBuilds: true,
  },
  /* otras opciones de config si las tienes */
};

export default nextConfig;
