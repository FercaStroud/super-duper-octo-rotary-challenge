/**
 * Exports all route modules.
 * Author: Fernando Cárdenas
 * @returns {Object} An object containing all route modules.
 */
const chatRoutes = require('./chatRoutes');
const userRoutes = require('./userRoutes');

module.exports = {
    chatRoutes,
    userRoutes
};
