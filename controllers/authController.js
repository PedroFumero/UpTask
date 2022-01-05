const passport = require('passport')
const bcrypt = require('bcrypt')
const Op = require('sequelize').Op
const User = require('../models/User')
const { sendRecoveryToken } = require('../handlers/email')

const crypto = require('crypto')

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

const postGenerateToken = async (req, res, next) => {
  const { email } = req.body
  const user = await User.findOne({ where: { email } })

  if (!user) {
    req.flash('error', 'That E-mail is not registered on our Database')
    res.redirect('/restore-password')
  }

  // if user exists
  user.token = crypto.randomBytes(20).toString('hex')
  user.expiration = Date.now() + 3600000
  await user.save()

  // url reset
  const resetUrl = `http://${req.headers.host}/restore-password/${user.token}`
  // console.log(resetUrl)

  await sendRecoveryToken({
    user,
    subject: 'Password Reset',
    resetUrl,
    file: 'reset-password',
  })
  req.flash('correcto', 'A recovery E-mail was sent')
  res.redirect('/login')
}

const getResetPassword = async (req, res, next) => {
  const user = await User.findOne({ where: { token: req.params.token } })

  if (!user) {
    req.flash('error', 'Invalid token')
    res.redirect('/restore-password')
  }
  console.log(user)
  res.render('reset-password', { pageName: 'Restore Password' })
}

const postResetPassword = async (req, res, next) => {
  // Validate token
  const { token } = req.params

  const user = await User.findOne({
    where: { token, expiration: { [Op.gte]: Date.now() } },
  })

  if (!user) {
    req.flash('error', 'Invalid Token')
    return res.redirect('/restore-password')
  }

  // Hashing the new password
  const { password } = req.body
  user.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  user.token = null
  user.expiration = null
  await user.save()

  res.redirect('/login')
}

module.exports = {
  authenticateUser,
  checkAuthentication,
  logOut,
  postGenerateToken,
  getResetPassword,
  postResetPassword,
}
