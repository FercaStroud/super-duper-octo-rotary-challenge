const mongoose = require('mongoose');
const logger = require('./logger');

/**
 * Connects to the MongoDB database.
 * Author: Fernando Cárdenas
 * @returns {Promise<void>} Resolves when the connection is successful, rejects on failure.
 */
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        logger.info('MongoDB connected successfully');
    } catch (err) {
        logger.error('MongoDB connection error:', err.message);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDB;
