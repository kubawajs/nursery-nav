import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    distDir: './dist',
    images: {
        unoptimized: true,
    },// change later
}

export default nextConfig