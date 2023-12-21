const router = require('express').Router();
const messageController = require('../Controllers/messageController');
const middlewareController = require('../Controllers/middlewareController');

router.post(
    '/',
    middlewareController.verifyToken,
    messageController.createMessage
);

//GET MESSAGE
router.get(
    '/:conversationId',
    middlewareController.verifyToken,
    messageController.getMessage
);

module.exports = router;
