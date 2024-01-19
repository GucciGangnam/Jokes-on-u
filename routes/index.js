var express = require('express');
var router = express.Router();

// Import controllers 
const home_controller = require("../controllers/homeController")
const signup_controller = require("../controllers/signupController")
const users_controller = require("../controllers/usersController")

/* GET / page */
router.get('/', (req, res) => {
  res.redirect('/home');
});

/* GET Home page */
router.get('/home', home_controller.home);

// SIGN UP //
/* Get sign up page */
router.get('/signup', signup_controller.signup_get);
router.post('/signup', signup_controller.signup_post);

// login //
// Get login page //
router.get('/login', (req, res) => {
  res.render('login');
});

// USERS //
// Get users page //
router.get('/users', users_controller.display_users)

module.exports = router;

