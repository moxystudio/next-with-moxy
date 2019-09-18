/* eslint-disable prefer-import/prefer-import-over-require */

module.exports = (api) => {
    api.cache(false);

    return require('babel-preset-moxy/end-project')(api, {
        modules: process.env.NODE_ENV === 'test' ? 'commonjs' : false,
        react: true,
        loose: false,
        targets: {
            // Maintain the node version as same as the one in Dockerfile
            node: 'current',
            browsers: require('./package.json').browserslist,
        },
    });
};
