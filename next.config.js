'use strict';

const { withRasterImages, withPlayback, withSVG, withFonts, with3D } = require('@moxy/next-common-files');
const withOneOf = require('@moxy/next-webpack-oneof');
const withCompileNodeModules = require('@moxy/next-compile-node-modules');
const withNextIntl = require('@moxy/next-intl/plugin');
const withPlugins = require('next-compose-plugins');
const withSitemap = require('@moxy/next-sitemaps/plugin');
const envVar = require('env-var');
const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } = require('next/constants');

const isEnvRequired = (phase) => phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD;

const extEnvVar = envVar.from(process.env, {
    asStringWithPattern(value, regExp) {
        const valid = regExp.test(value);

        if (!valid) {
            throw new Error(`should match pattern ${regExp.toString()}`);
        }

        return value;
    },
});

module.exports = (phase, params) => {
    const COMPRESSION = extEnvVar.get('COMPRESSION').asBool();
    const GTM_CONTAINER_ID = extEnvVar.get('GTM_CONTAINER_ID').asString();
    const SITE_URL = extEnvVar.get('SITE_URL')
        .required(isEnvRequired(phase))
        .asStringWithPattern(/^https?:\/\/[^/]+$/);

    return withPlugins([
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
        withSitemap(phase, SITE_URL),
    ], {
        poweredByHeader: false,
        compress: COMPRESSION,
        env: {
            GTM_CONTAINER_ID,
            SITE_URL,
        },
    })(phase, params);
};
