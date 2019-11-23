module.exports = (api) => {
    api.cache(true);

    return require('@moxy/babel-preset/end-project')(api, {
        modules: process.env.NODE_ENV === 'test' ? 'commonjs' : false,
        react: true,
        loose: false,
        targets: {
            node: 'current',
            browsers: require('./package.json').browserslist,
        },
    });
};
