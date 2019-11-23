module.exports = require('@moxy/postcss-preset')({
    browsers: require('./package.json').browserslist,
    url: [
        { filter: /\.data-url\./, url: 'inline' },
        { filter: '**/*', url: 'rebase' },
    ],
});
