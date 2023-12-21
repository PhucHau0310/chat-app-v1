const Conversation = require('../Models/Conversation');
const Message = require('../Models/Message');

const messageController = {
    // [POST] /v1/message/
    createMessage: async (req, res) => {
        try {
            const newMess = new Message({
                conversationId: req.body.conversationId,
                sender: req.body.sender,
                text: req.body.text,
            });

            const savedNewMess = await newMess.save();

            // console.log(savedNewMess);
            await Conversation.findByIdAndUpdate(
                {
                    _id: req.body.conversationId,
                },
                { $push: { messages: savedNewMess } }
            );

            res.status(200).json(savedNewMess);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },
    // [GET] /v1/message/:conversationId
    getMessage: async (req, res) => {
        try {
            const messages = await Message.find({
                conversationId: req.params.conversationId,
            });
            res.status(200).json(messages);
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

module.exports = messageController;
