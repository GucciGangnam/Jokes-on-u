const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messagesSchema = new Schema({
    MESSAGE_ID: {
        type: String,
        required: true,
    },
    MESSAGE_AUTHOR: { 
        type: String,
        required: true,
    },
    MESSAGE_TITLE: { 
        type: String,
        required: true,
    },
    MESSAGE_CONTENT: { 
        type: String,
        required: true,
    },
    MESSAGE_TIMESTAMP: { 
        type: Date,
        required: true,
    }, 
    MESSAGE_AUTHOR_ID: { 
        type: String, 
        required: true,
    }, 
    MESSAGE_APPLAUSE: { 
        type: Number,
        required: true
    }
}, { collection: 'Messages' }); // Specify the collection name here

// Set the connection explicitly
module.exports = mongoose.model('Messages', messagesSchema, 'Messages');