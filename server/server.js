require('dotenv').config();
const { initializeApp } = require('./app');
const logger = require('./config/logger');

/**
 * Starts the HTTP server and listens on the specified port.
 * Author: Fernando Cárdenas
 * @returns {void}
 */
const startServer = async () => {
    const PORT = process.env.PORT || 3000;
    try {
        const server = await initializeApp();
        server.listen(PORT, () => {
            logger.info(`Server running on port ${PORT}`);
        });
    } catch (error) {
        logger.error('Failed to start server: ', error);
        process.exit(1);
    }
};

startServer();
