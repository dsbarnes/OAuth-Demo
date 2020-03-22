const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model');


// Serialization is making a cookey
// and storing it in the browser of our user.
// this way they don't need to log in every time
// they just open the site and boom! Profile page!
passport.serializeUser((user, done) => {
    // This is the ID from MONGODB!!
    // null is where error handling goes.

    // We've made or found a user,
    // We just made the cookie for their logins here
    // and now we pass to the next stage
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then((user) => {
            done(null, user);
        });
});


//All this is to log in at all
// http://www.passportjs.org/packages/passport-google-oauth20/
passport.use(
    new GoogleStrategy({
        // Options for google strat
        // The callbackURL must be the full path!!
        callbackURL: 'http://localhost:4444/auth/google/callback',
        clientID: keys.GOOGLE.clientID,
        clientSecret: keys.GOOGLE.clientSecret
    },

        (accessToken, refreshToken, profile, done) => {
            // This is when we do the mongodb stuff:
            // Does this user already exist in the db?
            User.findOne({ googleId: profile.id })
                .then((currentUser) => {
                    if (currentUser) {
                        //Already have a user
                        console.log('current user is ', currentUser);
                        // Done means, go to the next stage (like .then())
                        // We pass the user to done, and seralizeUser is called
                        done(null, currentUser);
                    }
                    else {
                        // then we need to create that user
                        new User({
                            googleId: profile.id,
                            displayName: profile.displayName,
                            familyName: profile.name.familyName,
                            givenName: profile.name.givenName,
                            photo: profile.photos[0].value,
                            local: profile.json.local
                        })
                            .save()
                            .then(newUser => {
                                console.log('new User created!' + newUser);
                                // done is calling searalizeUser,
                                // exactly the same as above,
                                // the ONLY diff is that we created the user first.
                                done(null, newUser);
                            })
                    }
                })
        })
);
