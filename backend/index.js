const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/connectDB');
const authRoute = require('./Routes/auth');
const userRoute = require('./Routes/user');
const conRoute = require('./Routes/conversation');
const messRoute = require('./Routes/message');
const http = require('http');
const socketIO = require('socket.io');
const app = express();

const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: 'http://localhost:3000',
    },
});

dotenv.config();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// CONNECT MONGODB
connectDB();

// ROUTES
app.use('/v1/auth', authRoute);
app.use('/v1/user', userRoute);
app.use('/v1/conversation', conRoute);
app.use('/v1/message', messRoute);

app.get('/v1', (req, res) => {
    res.status(200).json('Hello to my app blog');
});

// Socket.io connect
io.on('connection', (socket) => {
    // console.log('A user connected');

    socket.on('join', (conversationId) => {
        socket.join(conversationId);
        // console.log('Join conversation: ', conversationId);
    });

    socket.on('leave', (conversationId) => {
        // console.log('Left conversation: ', conversationId);
        socket.leave(conversationId);
    });

    socket.on('message', (data) => {
        // io.to(data.conversationId).emit('newMessage', data);
        socket.to(data.conversationId).emit('newMessage', data);
    });

    socket.on('disconnect', () => {
        // console.log('User disconnected');
    });
});

server.listen(3005, () => {
    console.log('Server socket is running');
});

app.listen(3003, () => {
    console.log('Server is running ...');
});
