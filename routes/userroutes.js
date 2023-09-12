const express = require('express');
const route = express.Router();
const validatetoken = require('../middleware/validatetoken')
const user = require('../controller/usercontrol');

route.post('/register' , user.registeruser);
route.post('/login' , user.loginuser);
route.get('/current' , validatetoken, user.currentuser);


module.exports = route;