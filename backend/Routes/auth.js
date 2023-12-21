const router = require('express').Router();
const authControllers = require('../Controllers/authController');
const middlewareController = require('../Controllers/middlewareController');

router.post('/register', authControllers.register);
router.post('/login', authControllers.login);
router.post('/refreshToken', authControllers.requestRefreshToken);
router.post(
    '/logout',
    middlewareController.verifyToken,
    authControllers.logout
);

module.exports = router;
