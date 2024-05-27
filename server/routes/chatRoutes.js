const express = require('express');
const router = express.Router();
const { getMessages, createMessage } = require('../controllers/chatController');

/**
 * Sets up chat routes.
 * Author: Fernando Cárdenas
 * @param {Object} router - Express router object.
 * @returns {void} Sets up GET and POST routes for messages.
 */
router.get('/messages', getMessages);
router.post('/messages', createMessage);

module.exports = router;
