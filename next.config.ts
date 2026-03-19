/** @type {import('next').NextConfig} */
const supabaseHostname = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL!).hostname;

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: supabaseHostname,
      },
    ],
  },
};

module.exports = nextConfig;
// 