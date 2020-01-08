const { compose, baseConfig, withWeb } = require('@moxy/jest-config');

module.exports = compose([baseConfig, withWeb]);
