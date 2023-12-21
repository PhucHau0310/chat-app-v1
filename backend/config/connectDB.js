const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.URI_MONGODB);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('ERROR: ', error);
    }
};

module.exports = connectDB;
