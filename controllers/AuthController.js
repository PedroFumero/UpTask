const passport = require('passport')

class AuthController {
  userAuthenticate = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  })

  userAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    return res.redirect('/login')
  }

  destroySession = (req, res, next) => {
    req.session.destroy(() => {
      return res.redirect('/login')
    })
  }
}

module.exports = new AuthController()
