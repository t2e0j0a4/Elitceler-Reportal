/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'reportal-media.s3.ap-south-1.amazonaws.com',
                protocol: 'https',                
            }
        ]
    }
}

module.exports = nextConfig
