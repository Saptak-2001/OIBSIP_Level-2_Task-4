const express = require('express');
const { registerController, loginController, forgotPasswordController } = require('../controllers/authController');


const router = express.Router();

router.post('/sign-up', registerController);
router.post('/login', loginController);
router.post('/forgot-password', forgotPasswordController);

module.exports = router;