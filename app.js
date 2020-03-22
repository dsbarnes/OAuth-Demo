const express = require('express');
const nunjucks = require('nunjucks')
const passport = require('passport');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const authRoutes = require('./routes/auth-routes');
// This import exists just for the code to be run!!
const passportSetup = require('./config/passport-setup');
const serverless = require('serverless-http')


const app = express();

// I like nunjucks (bc Django), but feel free to use whatever:
// app.set('view engine', 'ejs');
nunjucks.configure('views', {
    express: app,
    autoescape: true
});
app.set('view engine', 'html');

// For adding CSS
app.use(express.static(__dirname + '/style'));

// cookie setup
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

// init passport
app.use(passport.initialize());
app.use(passport.session());

// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('connected to mongodb')
});

// Login / Home route:
app.get('/', (req, res) => {
    res.render('login', { user: req.user });
});

// Auth routes:
app.use('/auth', authRoutes);


app.listen(4444, () => {
    console.log('App is listening on 4444');
});
