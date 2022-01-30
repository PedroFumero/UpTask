const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

// Step 1
// Reference to the model
const { User } = require('../models')

// Step 2
// Setting up passport local strategy
passport.use(
  new LocalStrategy(
    // By default local strategy is waiting for username and password
    { usernameField: 'email', passwordField: 'password' },
    // Querying to DB searching for user
    async (email, password, done) => {
      try {
        const user = await User.findOne({ where: { email, active: 1 } })
        // Incorrect password
        if (!user.passwordIsRight(password)) {
          return done(null, false, { message: 'Incorrect password' })
        }
        // All it's ok
        return done(null, user)
      } catch (error) {
        //   Account doesn't exist
        return done(null, false, { message: "Account doesn't exist" })
      }
    }
  )
)

passport.serializeUser((user, cb) => {
  cb(null, user.id)
})

passport.deserializeUser((id, cb) => {
  cb(null, id)
})

module.exports = passport
