'use strict';

const { compose, baseConfig, withWeb, withRTL } = require('@moxy/jest-config');

module.exports = compose([baseConfig, withWeb, withRTL]);
