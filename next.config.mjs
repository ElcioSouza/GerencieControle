import dotenv from "dotenv";
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['www.dropbox.com'],
      },
    env: {
        SERVICEID: process.env.SERVICEID,
        TEMPLATEID: process.env.TEMPLATEID,
        USERID: process.env.USERID
    }
};
export default nextConfig;
