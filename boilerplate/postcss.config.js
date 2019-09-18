/* eslint-disable prefer-import/prefer-import-over-require */

module.exports = require('postcss-preset-moxy')({
    browsers: require('./package.json').browserslist,
    url: [
        { filter: /\.(eot|ttf|woff|woff2|otf)$/, url: 'inline' },
        { filter: '**/*', url: 'inline', maxSize: 2 },
        { filter: '**/*', url: 'rebase' },
    ],
});
