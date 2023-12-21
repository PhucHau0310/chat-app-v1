const router = require('express').Router();
const userController = require('../Controllers/userController');
const middlewareController = require('../Controllers/middlewareController');

router.get(
    '/:userId',
    middlewareController.verifyToken,
    userController.getAnUser
);

router.get(
    '/user/getAllUser',
    middlewareController.verifyToken,
    userController.getAllUser
);

router.put(
    '/updateUser/:userId',
    middlewareController.verifyToken,
    userController.updateUser
);

router.post(
    '/addFriend/:senderId/:receiverId',
    middlewareController.verifyToken,
    userController.addFriend
);

module.exports = router;
