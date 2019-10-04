/* eslint-disable prefer-import/prefer-import-over-require */

const withPlugins = require('next-compose-plugins');
const { withRasterImages, withPlayback, withSVG, withFonts } = require('@moxy/next-common-files');
const withCSS = require('@zeit/next-css');
const CompressionPlugin = require('compression-webpack-plugin');
const { PHASE_PRODUCTION_BUILD } = require('next/constants');
const zlib = require('zlib');
const webpack = require('webpack');
const mimeDb = require('mime-db');
const pickBy = require('lodash/pickBy');

require('dotenv').config();

const compressibleRegExps = Object
.values(mimeDb)
.filter((mime) => mime.compressible && mime.extensions)
.reduce((extensions, mime) => {
    mime.extensions.forEach((ext) => extensions.push(new RegExp(`\\.${ext}`)));

    return extensions;
}, []);

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
        [withRasterImages({
            exclude: [/favicons\/.*$/, /\.data-url\./],
        })],
        [withRasterImages({
            include: /\.data-url\./,
            options: {
                limit: Number.MAX_SAFE_INTEGER,
            },
        })],
        [withPlayback()],
        [withFonts()],
        [withSVG({
            exclude: [/\.data-url\./, /\.inline\./],
        })],
        [withSVG({
            include: /\.data-url\./,
            options: {
                limit: Number.MAX_SAFE_INTEGER,
            },
        })],
        [withSVG({
            test: /\.inline\./,
            inline: true,
        })],
    ], {
        webpack: (config, { dev, isServer }) => {
            const { defaultConfig: { assetPrefix } } = nextConfig;

            // Setup env variables that will be available in the client-side
            {
                const envVars = pickBy(process.env, (value, key) => key.startsWith('REACT_APP_'));

                config.plugins.push(new webpack.EnvironmentPlugin(envVars));
            }

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

            // Pre-compress assets that can be compressed
            if (phase === PHASE_PRODUCTION_BUILD) {
                config.plugins.push(new CompressionPlugin({
                    filename: '[path].gz[query]',
                    algorithm: 'gzip',
                    include: compressibleRegExps,
                }));

                // This check is need since we're using zeit/now for staging deploy
                // and it's node version doesn't have brotli compression
                if (zlib.brotliCompress) {
                    config.plugins.push(new CompressionPlugin({
                        filename: '[path].br[query]',
                        algorithm: 'brotliCompress',
                        include: compressibleRegExps,
                    }));
                }
            }

            return config;
        },
    })(phase, nextConfig);
