module.exports = require('postcss-preset-moxy')({
    browsers: require('./package.json').browserslist,
    url: [
        { filter: /\.data-url\./, url: 'inline' },
        { filter: '**/*', url: 'rebase' },
    ],
});
