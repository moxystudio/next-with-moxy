const withPlugins = require('next-compose-plugins');
const { withRasterImages, withPlayback, withSVG, withFonts } = require('@moxy/next-common-files');
const withCompression = require('@moxy/next-compression');
const withOneOf = require('@moxy/next-webpack-oneof');
const withCompileNodeModules = require('@moxy/next-compile-node-modules');
const withCSS = require('@zeit/next-css');
const { PHASE_PRODUCTION_BUILD } = require('next/constants');

require('dotenv').config();

module.exports = (phase, nextConfig) =>
    withPlugins([
        withOneOf,
        [withCSS, {
            cssModules: true,
            cssLoaderOptions: {
                importLoaders: 1,
                localIdentName: phase === PHASE_PRODUCTION_BUILD ?
                    '[hash:base64:5]' :
                    '[name]__[local]___[hash:base64:5]',
            },
        }],
        withRasterImages(),
        withRasterImages({
            include: /\.data-url\./,
            options: {
                limit: Infinity,
            },
        }),
        withPlayback(),
        withFonts(),
        withSVG(),
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
        withCompileNodeModules(),
    ], {
        env: {
            GA_TRACKING_ID: process.env.GA_TRACKING_ID,
        },
    })(phase, nextConfig);
