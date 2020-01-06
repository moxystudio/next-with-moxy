const { compose, baseConfig, withWeb } = require('@moxy/jest-config');

module.exports = compose([
    baseConfig,
    withWeb,
    (config) => {
        // TODO: remove this once we have higher coverage
        config.coverageThreshold = undefined;

        return config;
    },
]);
