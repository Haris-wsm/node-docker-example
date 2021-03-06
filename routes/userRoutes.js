const router = require('express').Router();

const authController = require('../controller/authController');

router.route('/signup').post(authController.signUp);
router.route('/login').post(authController.login);

module.exports = router;
