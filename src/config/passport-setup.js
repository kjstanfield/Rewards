const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')

passport.use(
  new GoogleStrategy({
  // options for the google strategy
    callbackURL: 'auth/google/redirect',
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET
  }, () => {
    // passport callback function
  })
)
