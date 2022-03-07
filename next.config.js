'use strict';

const { withRasterImages, withPlayback, withSVG, withFonts, with3D, withJSON5 } = require('@moxy/next-common-files');
const withOneOf = require('@moxy/next-webpack-oneof');
// const withCompileNodeModules = require('@moxy/next-compile-node-modules');
const withPlugins = require('next-compose-plugins');
const withSitemap = require('@moxy/next-sitemaps/plugin');
const envVar = require('env-var');
const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } = require('next/constants');
const { locales, defaultLocale } = require('./intl');

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
        .asStringWithPattern(/^https?:\/\/.+[^/]$/);

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
        withJSON5(),
        // withCompileNodeModules(),
        withSitemap(phase, SITE_URL),

        // Base config here.
        // Please note that the `nextConfig` variable contains the config after all plugins have run,
        // so be sure to merge it correctly.
        (nextConfig) => ({
            ...nextConfig,
            poweredByHeader: false,
            compress: COMPRESSION,
            eslint: {
                ignoreDuringBuilds: true,
            },
            i18n: {
                locales: locales.map(({ tag }) => tag),
                defaultLocale,
            },
            env: {
                ...nextConfig.env,
                GTM_CONTAINER_ID,
                SITE_URL,
            },
            webpack: (config, options) => {
                // Customize webpack config here..

                if (typeof nextConfig.webpack === 'function') {
                    return nextConfig.webpack(config, options);
                }

                return config;
            },
        }),
    ])(phase, params);
};
