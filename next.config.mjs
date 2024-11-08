/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:5000/api/:path*', // Thay thế bằng URL backend của bạn
        },
      ];
    },
  };
  
  export default nextConfig;
  