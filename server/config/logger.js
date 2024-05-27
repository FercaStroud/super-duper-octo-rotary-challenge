const winston = require('winston');
require('winston-daily-rotate-file');
const colors = require('colors');

/**
 * Sets up the logger configuration.
 */

// Configure colors for log levels
colors.setTheme({
    info: 'green',
    warn: 'yellow',
    error: 'red',
    debug: 'blue'
});

// Define log format
const logFormat = winston.format.printf(({level, message, timestamp}) => {
    return `${timestamp} ${level}: ${message}`.colorize(level);
});

// Define transports for logging
const transports = [
    new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
            logFormat
        )
    }),
    new winston.transports.DailyRotateFile({
        filename: 'logs/application-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        format: winston.format.combine(
            winston.format.timestamp(),
            logFormat
        )
    })
];

// Create the logger
const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: transports
});

/**
 * Adds color to the log level.
 *
 * @param {string} level - The log level.
 * @returns {string} The log level with color.
 */
String.prototype.colorize = function (level) {
    return this[level] || this;
};

module.exports = logger;
