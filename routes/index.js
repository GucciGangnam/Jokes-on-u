var express = require('express');
var router = express.Router();

// Import controllers 
const home_controller = require("../controllers/homeController")
const signup_controller = require("../controllers/signupController")
const users_controller = require("../controllers/usersController")
const login_controller = require("../controllers/loginController")
const message_controller = require("../controllers/messageController")
const account_controller = require("../controllers/accountController")

/* GET / page */
router.get('/', (req, res) => {
  res.redirect('/home');
});

/* GET Home page */
router.get('/home', home_controller.home);

// LOGIN //
// GET logIn page //


// SIGN UP //
// Get sign up page //
router.get('/signup', signup_controller.signup_get);
router.post('/signup', signup_controller.signup_post);

// login //
// Get login page //
router.get('/login', login_controller.login_get)
// POST login // 
router.post('/login', login_controller.login_post);
// Log Out GET //
router.get('/logout', login_controller.logout_get);

// USERS //
// Get users page //
router.get('/users', users_controller.display_users)

// Message //
router.get('/message', message_controller.message_get);
router.post('/message', message_controller.message_post);
// DELETE MESSAGE ??
router.get('/delete-message/:messageID', message_controller.delete_message)

// APPLUAD MESSAGE
  router.get('/applaud-message/:messageID', message_controller.applaud_message)

// ACCOUNT //
router.get("/account", account_controller.account_get)
router.post("/account", account_controller.code_post)

router.get('/delete-account', account_controller.delete_account_get)
router.post('/delete-account', account_controller.delete_account_post)

module.exports = router;

