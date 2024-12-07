/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['puppeteer-core'],
    },

    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.module.rules.push({
                test: /\.js\.map$/,
                use: ['ignore-loader'],
            })
        }
        return config
    },
    images: {
        domains: ['ae-pic-a1.aliexpress-media.com'],
    },
}

export default nextConfig
