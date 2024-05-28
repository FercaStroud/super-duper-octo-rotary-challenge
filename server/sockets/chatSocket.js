const Message = require('../models/Message');
const User = require('../models/User');
const logger = require('../config/logger');

/**
 * chatSocket function to handle WebSocket connections and events.
 * Author: Fernando Cárdenas
 * @param {Object} io - Socket.IO server instance.
 * @returns {void} Initializes WebSocket event handlers.
 */
const chatSocket = (io) => {
    logger.info('chatSocket initialized');

    io.on('connection', (socket) => {
        logger.info(`New client connected: ${socket.id}`);

        socket.on('sendMessage', async (data) => {
            try {
                const { userId, message } = data;
                if (!userId || !message) {
                    logger.warn(`Invalid message data: ${JSON.stringify(data)}`);
                    return socket.emit('errorMessage', 'User ID and message are required');
                }

                const user = await User.findById(userId);
                if (!user) {
                    logger.warn(`User not found: ${userId}`);
                    return socket.emit('errorMessage', 'User not found');
                }

                const newMessage = new Message({ user: userId, message });
                const populatedMessage = await newMessage.populate('user', 'name');
                logger.info(`Message sent by ${user.name}: ${message}`);
                io.emit('newMessage', populatedMessage);
            } catch (error) {
                logger.error(`Error saving message: ${error.message}`);
                socket.emit('errorMessage', 'Failed to send message');
            }
        });

        socket.on('disconnect', () => {
            logger.info(`Client disconnected: ${socket.id}`);
        });
    });
};

module.exports = chatSocket;
