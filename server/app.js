require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const connectDB = require('./config/database');
const routes = require('./routes');
const chatSocket = require('./sockets/chatSocket');
const logger = require('./config/logger');
const { requestLogger, errorHandler } = require('./middleware');

const app = express();
const PORT = process.env.PORT || 3000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

// Configure CORS
const corsOptions = {
    origin: CLIENT_ORIGIN,
    methods: ['GET', 'POST'],
    credentials: true
};

/**
 * Configures middlewares and routes.
 */
const configureApp = () => {
    app.use(express.json());
    app.use(requestLogger);
    app.use(cors(corsOptions));
    app.use('/api/chat', routes.chatRoutes);
    app.use('/api/users', routes.userRoutes);
    app.use(errorHandler);
};

/**
 * Initializes the application, connects to the database, sets up middleware, routes, and WebSocket handling.
 * Author: Fernando Cárdenas
 * @returns {Promise<http.Server>} Resolves when the app is initialized successfully.
 */
const initializeApp = async () => {
    try {
        await connectDB();
        configureApp();

        const server = http.createServer(app);
        const io = socketIo(server, { cors: corsOptions });

        // Set up WebSocket handling
        chatSocket(io);

        logger.info('App initialized');
        return server;
    } catch (error) {
        logger.error('Failed to initialize app: ', error);
        process.exit(1);
    }
};

// If this file is run directly, initialize and start the server
if (require.main === module) {
    initializeApp().then(server => {
        server.listen(PORT, () => {
            logger.info(`Server running on port ${PORT}`);
        });
    });
}

module.exports = { app, initializeApp };
