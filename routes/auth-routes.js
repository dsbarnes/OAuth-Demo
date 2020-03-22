const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login', (req, res) => {
    res.render('login');
});


// auth logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/')
});


// ask to auth with google
router.get('/google',
    // passport.authenticate is a middleware
    // if user has NOT given consent to auth w/ google, ask them to
    // if the user HAS given consent to auth w/ google, send me a 'code'
    passport.authenticate('google',
        // Required by google, docs are a little hairy on this
        { scope: ['profile'] }
    ));

// given permission to auth w/ google, auth!
router.get('/google/callback',
    // When we use passport.authenticate this time, the user
    // has given permission to auth w/ google. 
    // We process the 'code' into a cookie
    passport.authenticate('google'),
    (req, res) => {
        // res.send(req.user);
        res.redirect('/');
    }
);

module.exports = router