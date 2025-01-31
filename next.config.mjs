import dotenv from "dotenv";
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['www.dropbox.com','lh3.googleusercontent.com'],
      },
    env: {
        SERVICEID: process.env.SERVICEID,
        TEMPLATEID: process.env.TEMPLATEID,
        USERID: process.env.USERID
    }
};
export default nextConfig;
