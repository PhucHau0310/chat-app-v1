const router = require('express').Router();
const conversationController = require('../Controllers/conversationController');
const middlewareController = require('../Controllers/middlewareController');

router.post(
    '/',
    middlewareController.verifyToken,
    conversationController.createConversation
);

router.get(
    '/:userId',
    middlewareController.verifyToken,
    conversationController.getConversation
);
module.exports = router;
