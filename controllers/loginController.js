// Imports 
const Users = require("../models/user"); const passport = require('passport');
// Import async handler
const asyncHandler = require("express-async-handler");
// Passport Imports
const session = require('express-session');

exports.login_get = asyncHandler(async (req, res, next) => {
    // dipslay log in page 
    const user = req.user; 
    if (user) { 
        res.redirect('/home')
    } else { 
        res.render('login', { user: user});
    }
})

exports.login_post = passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/login',
    });

exports.logout_get = (req, res) => {
    console.log("USER LOGGED OUT")
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
}

