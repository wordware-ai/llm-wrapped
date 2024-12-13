/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
      },
      {
        protocol: "https",
        hostname: "media.licdn.com",
      },
      {
        protocol: "https",
        hostname: "www.thisdayinmusic.com",
      },
      {
        protocol: "https",
        hostname: "static.licdn.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "store.bluenote.com",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "d3i6fh83elv35t.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "media.newyorker.com",
      },
      {
        protocol: "https",
        hostname: "platform.polygon.com",
      },
      {
        protocol: "https",
        hostname: "assets.soundgym.co",
      },
      {
        protocol: "https",
        hostname: "hips.hearstapps.com",
      },
      {
        protocol: "https",
        hostname: "ew.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "images.squarespace-cdn.com",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "travel.home.sndimg.com",
      },
      {
        protocol: "https",
        hostname: "logos-world.net",
      },
    ],
  },
};

export default config;
