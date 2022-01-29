const { User } = require('../models')

class UsersController {
  getSignup = (req, res, next) => {
    res.render('signup', { title: 'Signup - UpTask' })
  }

  postSignup = async (req, res, next) => {
    const { email, password } = req.body

    try {
      await User.create({ email, password })
      res.redirect('/login')
    } catch (error) {
      req.flash(
        'error',
        error.errors.map((error) => error.message)
      )
      res.render('signup', {
        title: 'Signup - UpTask',
        errors: req.flash(),
        email,
      })
    }
  }

  getLogin = (req, res, next) => {
    const { error } = req.flash()
    res.render('login', {
      title: 'Login - UpTask',
      error,
    })
  }

  getResetPassword = (req, res, next) => {
    res.render('reset-password', { title: 'Reset password' })
  }
}

module.exports = new UsersController()
