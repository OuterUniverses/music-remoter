/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        serverActions:{
            allowedOrigins:['music.catslab.cn:4433']
        }
    }
};

export default nextConfig;
