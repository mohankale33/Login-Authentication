const express = require('express');
const routing = express.Router();

const user = require('../controller/user');
routing.post('/register',user.registerUser);
routing.post('/login', user.userLogin);
routing.put('/changePassword', user.changePassword);
routing.get('/logout', user.logoutUser);

module.exports = routing;