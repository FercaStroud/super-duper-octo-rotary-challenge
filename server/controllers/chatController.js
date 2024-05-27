const Message = require('../models/Message');
const User = require('../models/User');
const logger = require('../config/logger');

/**
 * Fetches all chat messages.
 * Author: Fernando Cárdenas
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Sends a JSON response with messages or an error message.
 */
const getMessages = async (req, res) => {
    try {
        const messages = await Message.find().populate('user', 'name').sort({ createdAt: 1 });
        logger.info('Messages retrieved successfully');
        res.json(messages);
    } catch (err) {
        logger.error('Error retrieving messages:', err.message);
        res.status(500).json({ message: err.message });
    }
};

/**
 * Creates a new chat message.
 * Author: Fernando Cárdenas
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Sends a JSON response with the created message or an error message.
 */
const createMessage = async (req, res) => {
    try {
        const { userId, message } = req.body;
        if (!userId || !message) {
            logger.warn('Invalid message data:', req.body);
            return res.status(400).json({ message: "User ID and message are required" });
        }

        const user = await User.findById(userId);
        if (!user) {
            logger.warn('User not found:', userId);
            return res.status(404).json({ message: "User not found" });
        }

        const newMessage = new Message({ user: userId, message });
        await newMessage.save();

        logger.info('Message created successfully');
        res.status(201).json(newMessage);
    } catch (err) {
        logger.error('Error creating message:', err.message);
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getMessages, createMessage };
