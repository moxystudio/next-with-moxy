'use strict';

const { compose, baseConfig } = require('@moxy/jest-config-base');
const withWeb = require('@moxy/jest-config-web');
const { withRTL } = require('@moxy/jest-config-testing-library');

module.exports = compose(
    baseConfig(),
    withWeb(),
    withRTL(),
    (config) => {
        config.setupFilesAfterEnv = [
            ...config.setupFilesAfterEnv,
            './jest.setup.js',
        ];

        config.coveragePathIgnorePatterns = [
            ...config.coveragePathIgnorePatterns,
            // Temporary fix for a FOUC bug, which doesn't need tests.
            '<rootDir>/www/app/use-fouc-fix.js',
        ];

        return config;
    },
);
