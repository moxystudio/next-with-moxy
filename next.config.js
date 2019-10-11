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
            exclude: [/\.data-url\./],
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
        webpack: (config) => {
            // Remove exclude condition to transpile every node_module
            {
                const transpilingRule = config.module.rules.find((rule) => rule.use.loader === 'next-babel-loader');

                delete transpilingRule.exclude;
            }

            return config;
        },
    })(phase, nextConfig);
