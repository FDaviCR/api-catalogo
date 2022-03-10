const express = require('express');
const route = express.Router();

const UsersController = require('../controllers/UsersController');


route.post('/users', UsersController.createUser);

module.exports = route;