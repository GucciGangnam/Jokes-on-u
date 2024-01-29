// Imports 
// import schemes 
const Users = require("../models/user");
const Message = require("../models/message");
// Import async handler
const asyncHandler = require("express-async-handler");
// Import UUID 
const uuid = require('uuid');
//Validator methods
const { body, validationResult } = require("express-validator");

exports.message_get = asyncHandler(async (req, res, next) => {
    const user = req.user;
    console.log(user.USERNAME + "about to send a message?")
    res.render("newMessage", { user: user });
})

exports.message_post = asyncHandler(async (req, res, next) => {
    const title = req.body.title.charAt(0).toUpperCase() + req.body.title.slice(1);
    const message = req.body.message.charAt(0).toUpperCase() + req.body.message.slice(1);
    const auther = req.user.USERNAME;
    const authorID = req.user.USER_ID;
    const msgID = ("MSG_ID" + uuid.v4())
    const timeStamp = new Date();

    const newMessage = new Message({
        MESSAGE_ID: msgID,
        MESSAGE_AUTHOR: auther,
        MESSAGE_TITLE: title,
        MESSAGE_CONTENT: message,
        MESSAGE_TIMESTAMP: timeStamp,
        MESSAGE_AUTHOR_ID: authorID
    })
    await newMessage.save();
    res.redirect('/home');
})

exports.delete_message = asyncHandler(async (req, res, next) => {
    const user = req.user
    const messageID = req.params.messageID;
    // find message by message ID 
    const message = await Message.find({ MESSAGE_ID: messageID })
    const userID = user.USER_ID
    console.log(userID)
    console.log(messageID)
    if (user.ADMIN || userID == message[0].MESSAGE_AUTHOR_ID) {
        // delet the message 
        await Message.deleteOne({MESSAGE_ID: messageID})
        // render message board (home screen)
        res.redirect('/home');
    } else {
        res.send("stop trying to fuck around")
    }
})
