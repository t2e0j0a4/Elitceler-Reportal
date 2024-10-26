/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
          {
            source: "/api/:path*",
            headers: [
              {
                key: "Access-Control-Allow-Origin",
                value: "*", // Set your origin
              },
              {
                key: "Access-Control-Allow-Methods",
                value: "GET, POST, PUT, DELETE, OPTIONS",
              },
              {
                key: "Access-Control-Allow-Headers",
                value: "Content-Type, Authorization",
              },
            ],
          },
        ];
    },
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
