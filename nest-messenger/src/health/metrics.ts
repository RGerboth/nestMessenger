'use strict';

var INITIALIZATION_START;

/**
 * Metrics Module
 * @type {{status: _status}}
 */
/**
 * Initialize the metrics module
 * @private
 */
export function _init() {
    INITIALIZATION_START = new Date();
}

/**
 * Return the application status
 * @returns {{started: Date, uptime: number}}
 * @private
 */
export function _status() {
    return {
        started: INITIALIZATION_START,
        uptime: (Date.now() - Number(INITIALIZATION_START)) / 1000,
    };
}
