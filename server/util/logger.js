require('colors');
var _ = require('lodash');

var config = require('../config/config');

// create a noop(no operation) function for when logging is diabled
var noop = () => {};

// use console.log if logging is enabled, noop if disabled
var consoleLog = config.logging ? console.log.bind(console) : noop;

var logger = {
    log: function() {
        var args = _.toArray(arguments)
            .map(function(arg) {
                if (typeof arg === 'object') {
                    // turn the object into a string so we can log all the
                    // properties and color it
                    var string = JSON.stringify(arg, 2);
                    return string.magenta;
                } else {
                    // coerce to string to color
                    arg += '';
                    return arg.magenta;
                }
            });
        consoleLog.apply(console, args);
    }
};

module.exports = logger;
