// Imports 
// import schemes 
const Users = require("../models/user");

// Import async handler
const asyncHandler = require("express-async-handler");

// Home Controller
exports.home = asyncHandler(async (req, res, next) => {
    try {
        const allUsersCount = await Users.countDocuments({}).exec();
        res.render('home', { allUsersCount: allUsersCount });
    } catch (error) {
        console.error(error);
        next(error); // Call next with the error to pass it to the error handling middleware
    }
});


