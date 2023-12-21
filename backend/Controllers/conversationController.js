const Conversation = require('../Models/Conversation');

const conversationController = {
    // [POST] /v1/conversation/
    createConversation: async (req, res) => {
        try {
            const newConversation = new Conversation({
                name: req.body.name,
                members: [req.body.senderId, req.body.receiverId],
            });

            const saveNewConversation = await newConversation.save();

            res.status(200).json(saveNewConversation);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [GET] /v1/conversation/:userId
    getConversation: async (req, res) => {
        try {
            const conversation = await Conversation.find({
                members: { $in: [req.params.userId] },
            })
                .populate('members')
                .populate('messages');

            res.status(200).json(conversation);
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

module.exports = conversationController;
