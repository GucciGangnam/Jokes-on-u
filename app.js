var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// Passport Imports
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
// Import bcryptjs
const User = require("./models/user");

var indexRouter = require('./routes/index');


var app = express();

///////////////////////////////////////////////////////////////////////////////////// MONGODB CONFIGURATION (USING DOTEVN)
const dotenv = require('dotenv').config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@membersonly.gowzsbg.mongodb.net/members_only?retryWrites=true&w=majority`;
main().catch((err) => console.error(err));
async function main() {
  try {
    await mongoose.connect(mongoDB);
    console.log('Connected to MongoDB');
    // Get the list of all collections in the database
    const collections = await mongoose.connection.db.listCollections().toArray();
    // Log the names of all collections
    collections.forEach((collection) => {
      console.log(collection.name);
    });
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}
////////////////////////////////////////////////////////////////////////////////////////////

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// PassportJS Session//////////////////////////////////////////////////////////////////////////////////////////////
//PassPortJS
// Set Up Local Stragergy 
passport.use(
  new LocalStrategy(async (username, password, done) => {
      try {
          const user = await User.findOne({ USERNAME: username });
          if (!user) {
              console.log("no such user")
              return done(null, false, { message: "Incorrect username" });
          };
          const match = await bcrypt.compare(password, user.PASSWORD);
          if (!match) {
              // passwords do not match!
              console.log("incorrect password")
              return done(null, false, { message: "Incorrect password" })
          }
          console.log("youre logged in as" + username )
          return done(null, user);
      } catch (err) {
          return done(err);
      };
  })
);
//Sessions and serializer
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
      const user = await User.findById(id);
      done(null, user);
  } catch (err) {
      done(err);
  };
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.use(session({
  secret: `${process.env.SECRET_KEY}`,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
//////////////////////////////////////////
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
