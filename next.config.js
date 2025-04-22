/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['picsum.photos'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.module\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true,
          },
        },
      ],
    });
    return config;
  },
}

module.exports = nextConfig 