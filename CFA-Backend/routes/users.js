const express = require('express');

const checkAuth = require('../middleware/check-auth');

const UserController = require('../controllers/user');

const router = express.Router();

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.post("/add-employee-id", checkAuth, UserController.addEmployeeId);
router.get('/all-users', checkAuth, UserController.getAllUsers);
router.get('/current-user/:id', checkAuth, UserController.currentUser);
router.delete('/delete/:id', checkAuth, UserController.deleteUser);

module.exports = router;