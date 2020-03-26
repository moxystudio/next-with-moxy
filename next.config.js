'use strict';

require('dotenv').config();

const { withRasterImages, withPlayback, withSVG, withFonts, with3D } = require('@moxy/next-common-files');
const withOneOf = require('@moxy/next-webpack-oneof');
const withCompileNodeModules = require('@moxy/next-compile-node-modules');
const withNextIntl = require('@moxy/next-intl/plugin');
const withPlugins = require('next-compose-plugins');
const Joi = require('@hapi/joi');
const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } = require('next/constants');

const getEnvJoiPresence = (phase) =>
    phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD ? 'required' : 'optional';

module.exports = (phase, nextConfig) =>
    withPlugins([
        withOneOf,
        withRasterImages(),
        withRasterImages({
            include: /\.data-url\./,
            options: {
                limit: Infinity,
            },
        }),
        withPlayback(),
        withPlayback({
            include: /\.data-url\./,
            options: {
                limit: Infinity,
            },
        }),
        withFonts(),
        withFonts({
            include: /\.data-url\./,
            options: {
                limit: Infinity,
            },
        }),
        with3D(),
        with3D({
            include: /\.data-url\./,
            options: {
                limit: Infinity,
            },
        }),
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
        withNextIntl(),
        withCompileNodeModules({
            exclude: [
                // Exclude next-intl related polyfills as they are huge but are already compiled down to ES5
                /[\\/]node_modules[\\/]@formatjs[\\/].+?[\\/]locales\.js$/,
            ],
        }),
    ], {
        compress: process.env.COMPRESSION !== '0',
        env: {
            GTM_CONTAINER_ID: process.env.GTM_CONTAINER_ID,
            SITE_URL: Joi.attempt(
                process.env.SITE_URL,
                Joi.string()
                    .presence(getEnvJoiPresence(phase))
                    .uri({ scheme: ['https', 'http'] })
                    .pattern(/\/$/, { invert: true }),
                'SITE_URL - ',
            ),
        },
    })(phase, nextConfig);
