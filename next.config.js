const withPWA = require("@ducanh2912/next-pwa").default({
    dest: "public",
    register: true,
    skipWaiting: true,
    cacheOnFrontEndNav: true,
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,
    swcMinify: true,
    workboxOptions: {
      disableDevLogs: true,
    },
    // ... other options you like
  });
  

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "picsum.photos"
            }
        ]
    },
    reactStrictMode: false
}

module.exports = withPWA(nextConfig);

