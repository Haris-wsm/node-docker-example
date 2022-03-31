const router = require('express').Router();

const authController = require('../controller/authController');

router.route('/signup').post(authController.signUp);

module.exports = router;
