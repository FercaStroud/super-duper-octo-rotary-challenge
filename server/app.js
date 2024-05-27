require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./config/database');
const routes = require('./routes');
const chatSocket = require('./sockets/chatSocket');
const logger = require('./config/logger');
const { requestLogger, errorHandler } = require('./middleware');

const app = express();

/**
 * Initializes the application, connects to the database, sets up middleware, routes, and WebSocket handling.
 * Author: Fernando Cárdenas
 * @returns {Promise<void>} Resolves when the app is initialized successfully.
 */
const initializeApp = async () => {
    try {
        await connectDB();

        app.use(express.json());
        app.use(requestLogger);

        // Setup routes
        app.use('/api/chat', routes.chatRoutes);
        app.use('/api/users', routes.userRoutes);

        const server = http.createServer(app);
        const io = socketIo(server);

        // Setup WebSocket
        chatSocket(io);

        app.use(errorHandler);

        logger.info('App initialized');
        return server;
    } catch (error) {
        logger.error('Failed to initialize app: ', error);
        process.exit(1);
    }
};

module.exports = { app, initializeApp };
