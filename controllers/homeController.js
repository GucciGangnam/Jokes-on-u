// Imports 
// import schemes 
const Users = require("../models/user");
const Messages = require("../models/message");

// Import async handler
const asyncHandler = require("express-async-handler");

// Import passport for authentication
const passport = require('passport');

// Home Controller
exports.home = asyncHandler(async (req, res, next) => {
    try {
        const user = req.user;
        if (user) { 
            console.log("you are logged in as" + user.USERNAME);
        }
        const allUsersCount = await Users.countDocuments({}).exec();
        const allMsgCount = await Messages.countDocuments({}).exec();
        const allMessages = await Messages.find({}).exec();
        res.render('home', { allUsersCount: allUsersCount, user: user, allMsgCount: allMsgCount, allMessages: allMessages});
    } catch (error) {
        console.error(error);
        next(error); // Call next with the error to pass it to the error handling middleware
    }
});


