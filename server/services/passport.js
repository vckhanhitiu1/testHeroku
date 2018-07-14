const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/key');
const mongoose = require('mongoose')
const User = mongoose.model('users');


/*
+ Using the Token which supported from Google 
+ Handling with mongoose database which include queries database and create new object User
*/
passport.use(new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecrete,
        callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
        console.log("accessToken", accessToken);
        User.findOne({
            googleId: profile.id
        }).then(
            existingUser => {
                if (existingUser) {

                } else {
                    new User({
                        googleId: profile.id
                    }).save()
                }
            }
        )

    }
));