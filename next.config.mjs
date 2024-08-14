// next.config.mjs
export default {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/files/**",
      },
    ],
  },
};
