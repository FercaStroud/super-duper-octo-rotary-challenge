const express = require('express');
const router = express.Router();
const { createUser } = require('../controllers/userController');

/**
 * Sets up user routes.
 * Author: Fernando Cárdenas
 * @param {Object} router - Express router object.
 * @returns {void} Sets up POST route for user creation.
 */
router.post('/', createUser);

module.exports = router;
