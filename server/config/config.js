var _ = require('lodash');

// default config object for the api
var config = {
    dev: 'development',
    test: 'testing',
    prod: 'production',
    port: process.env.PORT || 3000
}

// if NODE_ENV was not set, set it to dev
process.env.NODE_ENV = process.env.NODE_ENV || config.dev;

// set config.env to whatever NODE_ENV is
config.env = process.env.NODE_ENV;

var envConfig;

try {
    envConfig = require('./' + config.env);
    envConfig = envConfig || {};
} catch(e) {
    envConfig = {};
}

module.exports = _.merge(config, envConfig);
