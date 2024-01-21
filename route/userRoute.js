const express = require('express');
const {loginController,registerController} = require('../controllers/userController');
const router = express.Router();

// login Routers
router.post('/login', loginController)

// register Routers
router.post('/register', registerController)


module.exports=router