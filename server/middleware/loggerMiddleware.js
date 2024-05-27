const logger = require('../config/logger');

/**
 * Middleware to log incoming HTTP requests.
 * Author: Fernando Cárdenas
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} Logs request details and calls next middleware.
 */
const requestLogger = (req, res, next) => {
    logger.info(`Incoming Request: ${req.method} ${req.url}`);
    if(req.method === 'POST') {
        logger.debug(`Body: ${JSON.stringify(req.body)} `);
    }
    next();
};

module.exports = requestLogger;
