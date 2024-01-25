
// Imports 
// import schemes 
const Users = require("../models/user");

// Import async handler
const asyncHandler = require("express-async-handler");

exports.display_users = asyncHandler(async(req, res, next) => { 
    try{ 
        const user = req.user;
        const allUsers = await Users.find({}).exec();
        res.render('users', {allUsers: allUsers, user: user});
    } catch (error) {
        console.error(error);
        next(error); // Call next with the error to pass it to the error handling middleware
    }
})