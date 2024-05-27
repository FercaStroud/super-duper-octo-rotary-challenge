const requestLogger = require('./loggerMiddleware');
const logger = require('../config/logger');

/**
 * Centralized error handling middleware.
 * Author: Fernando Cárdenas
 * @param {Object} err - Error object.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} Logs the error and sends a 500 response.
 */
const errorHandler = (err, req, res, next) => {
    logger.error(err.message);
    res.status(500).send('Server Error');
};

module.exports = {
    requestLogger,
    errorHandler
};
