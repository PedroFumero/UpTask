const crypto = require('crypto')
const passport = require('passport')
const bcrypt = require('bcrypt')
const Op = require('sequelize').Op
const sendEmail = require('../handlers/email')

const { User } = require('../models')

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

  sendToken = async (req, res) => {
    const user = await User.findOne({ where: { email: req.body.email } })
    if (!user) {
      req.flash('error', "Provided Email doesn't exist")
      return res.render('reset-password', {
        title: 'Reset password',
        error: req.flash(),
      })
    }

    const token = crypto.randomBytes(20).toString('hex')
    const expiration = Date.now() + 3600000

    user.token = token
    user.expiration = expiration
    await user.save()

    const resetURL = `http://${req.headers.host}/reset-password/${user.token}`
    // Send token via Email
    sendEmail({
      email: user.email,
      subject: 'Password reset ✔',
      url: resetURL,
      file: 'restore-password',
    })

    req.flash('success', 'Token was sent to Email')
    return res.render('login', {
      title: 'Login - UpTask',
      success: req.flash(),
    })
  }

  getResetPassword = async (req, res, next) => {
    const { token } = req.params
    const user = await User.findOne({ where: { token } })

    if (!user) {
      req.flash('error', 'Invalid token')
      return res.render('reset-password', {
        title: 'Reset password',
        error: req.flash(),
      })
    }

    res.render('restore-password', { title: 'Reset password' })
  }

  postResetPassword = async (req, res) => {
    const { token } = req.params
    const user = await User.findOne({
      where: {
        token,
        expiration: {
          [Op.gte]: Date.now(),
        },
      },
    })

    if (!user) {
      req.flash('error', 'Invalid token')
      return res.render('reset-password', {
        title: 'Reset password',
        error: req.flash(),
      })
    }

    const { password } = req.body
    user.password = await bcrypt.hash(password, 10)
    user.token = null
    user.expiration = null
    await user.save()
    res.redirect('/login')
  }
}

module.exports = new AuthController()
