const passport = require('passport')

const authenticateUser = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
})

const checkAuthentication = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login')
  }
  next()
}

const logOut = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect('/login')
  })
}

module.exports = {
  authenticateUser,
  checkAuthentication,
  logOut,
}
