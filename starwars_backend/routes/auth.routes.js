const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const auth = require('../middleware/auth');
const verifySignUp = require('../middleware/verifySignUp');

// Public routes
router.post('/register', verifySignUp.checkDuplicateUsernameOrEmail, authController.register);
router.post('/login', authController.login);

// Protected routes
router.get('/profile', auth, authController.getUser);
router.put('/favorites', auth, authController.updateFavorites);

module.exports = router;
