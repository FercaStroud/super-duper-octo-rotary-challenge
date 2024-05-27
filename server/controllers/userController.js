const User = require('../models/User');
const logger = require('../config/logger');

/**
 * Creates a new user.
 * Author: Fernando Cárdenas
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Sends a JSON response with the created user or an error message.
 */
const createUser = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            logger.warn('Invalid user data:', req.body);
            return res.status(400).json({ message: "Name is required" });
        }

        const user = new User({ name });
        await user.save();
        logger.info('User created successfully');
        res.status(201).json(user);
    } catch (err) {
        logger.error('Error creating user:', err.message);
        res.status(500).json({ message: err.message });
    }
};

module.exports = { createUser };
