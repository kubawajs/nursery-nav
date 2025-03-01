import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    output: 'export',
    distDir: './dist',
    images: {
        unoptimized: true,
    },// change later
}

export default nextConfig