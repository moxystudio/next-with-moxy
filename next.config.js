const withPlugins = require('next-compose-plugins');
const { withRasterImages, withPlayback, withSVG, withFonts } = require('@moxy/next-common-files');
const withCompression = require('@moxy/next-compression');
const withCSS = require('@zeit/next-css');
const { PHASE_PRODUCTION_BUILD } = require('next/constants');

require('dotenv').config();

module.exports = (phase, nextConfig) =>
    withPlugins([
        [withCSS, {
            cssModules: true,
            cssLoaderOptions: {
                importLoaders: 1,
                localIdentName: phase === PHASE_PRODUCTION_BUILD ?
                    '[hash:base64:5]' :
                    '[name]__[local]___[hash:base64:5]',
            },
        }],
        withRasterImages({
            exclude: [/favicons\/.*$/, /\.data-url\./],
        }),
        withRasterImages({
            include: /\.data-url\./,
            options: {
                limit: Infinity,
            },
        }),
        withPlayback(),
        withFonts(),
        withSVG({
            exclude: [/\.data-url\./, /\.inline\./],
        }),
        withSVG({
            include: /\.data-url\./,
            options: {
                limit: Infinity,
            },
        }),
        withSVG({
            include: /\.inline\./,
            inline: true,
        }),
        withCompression,
    ], {
        env: {
            GA_TRACKING_ID: process.env.GA_TRACKING_ID,
        },
        webpack: (config, { dev, isServer }) => {
            const { defaultConfig: { assetPrefix } } = nextConfig;

            // Remove exclude condition to transpile every node_module
            {
                const transpilingRule = config.module.rules.find((rule) => rule.use.loader === 'next-babel-loader');

                delete transpilingRule.exclude;
            }

            // Favicons used in the server
            config.module.rules.push({
                test: /favicons\/.*$/,
                loader: require.resolve('file-loader'),
                options: {
                    name: dev ? 'favicons/[name].[ext]' : 'favicons/[name].[hash:15].[ext]',
                    publicPath: `${assetPrefix}/_next/static/chunks/media`,
                    outputPath: '../static/chunks/media',
                    emitFile: isServer,
                },
            });

            return config;
        },
    })(phase, nextConfig);
