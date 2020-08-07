'use strict';

const { compose, baseConfig } = require('@moxy/jest-config-base');
const withWeb = require('@moxy/jest-config-web');
const { withRTL } = require('@moxy/jest-config-testing-library');

module.exports = compose(
    baseConfig(),
    withWeb(),
    withRTL(),
);
