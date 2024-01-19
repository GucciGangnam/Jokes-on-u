
// Imports 
// import schemes 
const Users = require("../models/user");
// Import async handler
const asyncHandler = require("express-async-handler");
// Import UUID 
const uuid = require('uuid');
//Validator methods
const { body, validationResult } = require("express-validator");
// Import Bcryptjs
const bcrypt = require('bcryptjs');


// Display Sign Up Page
exports.signup_get = (req, res, next) => {
    res.render("signup", { formData: {} });
}

// MAKE A MEMBER
exports.signup_post = [
    // validate and sanitize
    body("firstname")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Must have a name")
        .custom(value => {
            if (!/^[a-zA-Z0-9]+$/.test(value)) {
                throw new Error("Name can only contain letters and numbers");
            }
            return true;
        }),
    body("lastname")
        .trim()
        .custom(value => {
            if (!/^[a-zA-Z0-9]+$/.test(value)) {
                throw new Error("Name can only contain letters and numbers");
            }
            return true;
        }),
    body("email")
        .trim()
        .isEmail()
        .withMessage('Invalid email address'),
    body("username")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Must have a username")
        .custom(value => {
            if (!/^[a-zA-Z0-9]+$/.test(value)) {
                throw new Error("Username can only contain letters and numbers");
            }
            return true;
        }),
    body("password")
        .trim()
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long")
        // Add any additional password validation rules if needed,
        // such as minimum length or complexity requirements
        .custom(value => {
            // Custom password validation logic goes here
            return true;
        }),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const { firstname, lastname, email, username } = req.body;
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.render("signup", { errors: errors.array(), formData: { firstname, lastname, email, username } });
        }
        try {
            const userId = uuid.v4();
            const newMember = new Users({
                USER_ID: userId,
                USERNAME: req.body.username,
                PASSWORD: req.body.password,
                EMAIL: req.body.email,
                FIRST_NAME: req.body.firstname,
                LAST_NAME: req.body.lastname,
                STATUS: "Noob"
            });
            await newMember.save();
            res.redirect('/home');
        } catch (error) {
            console.error(error);
            next(error); // Call next with the error to pass it to the error handling middleware
        }
    })
];


