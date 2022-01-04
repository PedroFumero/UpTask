const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

// Reference to the model to authenticate
const User = require('../models/User')

// Local Strategy (user and password)
passport.use(
  new LocalStrategy(
    // By default password is waiting for a user and password
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ where: { email } })
        // User exist but maybe the password doesn't match
        if (!user.verifyPassword(password)) {
          return done(null, false, {
            message: 'Incorrect password',
          })
        }
        // User exist and password is correct
        return done(null, user)
      } catch (error) {
        //   User entered doesn't exist
        return done(null, false, {
          message: "The E-mail entered doesn't exist",
        })
      }
    }
  )
)

// Serialize user
passport.serializeUser((user, callback) => {
  callback(null, user)
})

// Deserialize user
passport.deserializeUser((user, callback) => {
  callback(null, user)
})

module.exports = passport
