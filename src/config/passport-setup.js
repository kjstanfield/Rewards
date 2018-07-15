const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const Admin = require('../models/admin-model')

// Grabs admin to create cookie
passport.serializeUser((admin, done) => {
  done(null, admin.id)
})

// Find admin from cookie
passport.deserializeUser((id, done) => {
  Admin.findById(id).then((admin) => {
    done(null, admin)
  })
})

passport.use(
  new GoogleStrategy({
    // options for the google strategy
    callbackURL: '/auth/google/redirect',
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET
  }, (accessToken, refreshToken, profile, done) => {
    // check if admin already exists in DB
    Admin.findOne({
      googleID: profile.id
    })
      .then((currentAdmin) => {
        if (currentAdmin) {
          // already exists
          console.log('admin is: ', currentAdmin)
          done(null, currentAdmin)
        } else {
          // doesn't exist, creating admin in DB
          new Admin({
            username: profile.displayname,
            googleID: profile.id
          }).save().then((newAdmin) => {
            console.log('New admin created:' + newAdmin)
            done(null, newAdmin)
          })
        }
      })
  })
)
