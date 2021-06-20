const express = require('express');

const checkAuth = require('../middleware/check-auth');

const UserController = require('../controllers/user');

const router = express.Router();

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.get('/all-users', checkAuth, UserController.getAllUsers);
router.get('/current-user/:id', checkAuth, UserController.currentUser);

module.exports = router;