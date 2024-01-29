// Imports 
// import schemes 
const Users = require("../models/user");
const Messages = require("../models/message");

// Import async handler
const asyncHandler = require("express-async-handler");

//Validator methods
const { body, validationResult } = require("express-validator");

// Login Controller
const login_controller = require("../controllers/loginController")

// Account Controller 
exports.account_get = asyncHandler(async (req, res, next) => {
    const user = req.user;
    console.log(user)
    res.render('account', { user: user })
})

exports.code_post = asyncHandler(async (req, res, next) => {
    const user = req.user;
    const submission = req.body.code;
    console.log(`(${submission} == 42) = ${submission == 42}`); // Log the logic result

    if (submission == 42) { 
        // set user.VIP true
        await Users.updateOne({ _id: req.user.id }, { $set: { VIP: true } });
        res.redirect("/account")
    } else { 
        console.log((submission == 42))
        res.render("account", {user:user, correct:false})
    }
})

exports.delete_account_get = asyncHandler(async(req, res, next) => { 
    const user = req.user;
    res.render("deleteAccount", { user: user });
})

exports.delete_account_post = asyncHandler(async(req, res, next) => { 
    const user = req.user;
    // Deelete account find user.USERNAME
    await Users.deleteOne({USERNAME: user.USERNAME})
    // find and dlete messages by Message_aurthor
    await Messages.deleteMany({MESSAGE_AUTHOR: user.USERNAME})
    // Log User Out 
    login_controller.logout_get
    res.redirect("/home")
})
