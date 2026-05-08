/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },

  // Rewrite /api/* to the Flask backend.
  // - In dev:        proxy to localhost:5000
  // - In production: only rewrite if NEXT_PUBLIC_API_URL is *not* an absolute URL
  //                  (i.e. backend is colocated with frontend on the same Vercel project).
  //                  If NEXT_PUBLIC_API_URL is absolute, the API client will hit it
  //                  directly and we don't need a rewrite.
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const isAbsolute = apiUrl && /^https?:\/\//.test(apiUrl)

    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:5000/api/:path*',
        },
      ]
    }

    if (isAbsolute) {
      // Frontend will call the absolute backend URL directly; no rewrite needed.
      return []
    }

    // Default: assume backend is deployed under the same domain at /api/*
    return []
  },

  async redirects() {
    return []
  },
}

module.exports = nextConfig