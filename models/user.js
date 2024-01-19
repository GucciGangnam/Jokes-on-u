const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    USER_ID: {
        type: String,
        required: true,
    },
    USERNAME: {
        type: String,
        required: true,
    },
    PASSWORD: {
        type: String,
        required: true,
    },
    EMAIL: {
        type: String,
        required: true,
    },
    FIRST_NAME: {
        type: String,
        required: true,
    },
    LAST_NAME: {
        type: String,
        required: true,
    },
    STATUS: {
        type: String,
        required: true,
    },
}, { collection: 'Users' }); // Specify the collection name here

// Set the connection explicitly
module.exports = mongoose.model('User', usersSchema, 'Users');
