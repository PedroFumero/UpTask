const sendEmail = require('../handlers/email')

const { User } = require('../models')

class UsersController {
  getSignup = (req, res, next) => {
    res.render('signup', { title: 'Signup - UpTask' })
  }

  postSignup = async (req, res, next) => {
    const { email, password } = req.body

    try {
      await User.create({ email, password })

      // Create confirmation URL
      const confirmationURL = `http://${req.headers.host}/activate/${email}`

      // Send email
      sendEmail({
        email,
        subject: 'Account activation - UpTask ✔',
        url: confirmationURL,
        file: 'account-activation',
      })

      // Redirect to user
      req.flash('success', "We've sent a confirmation Email.")
      return res.render('login', {
        title: 'Login - UpTask',
        success: req.flash(),
      })
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

  getConfirmAccount = async (req, res, next) => {
    const user = await User.findOne({ where: { email: req.params.email } })

    if (!user) {
      return res.redirect('/signup')
    }

    user.active = true
    await user.save()

    req.flash('success', 'Your account was activated successfully.')
    return res.render('login', {
      title: 'Login - UpTask',
      success: req.flash(),
    })
  }
}

module.exports = new UsersController()
