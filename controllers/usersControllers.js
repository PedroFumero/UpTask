const User = require('../models/User')
const { sendRecoveryToken } = require('../handlers/email')

const getCreateAccount = (req, res, next) => {
  res.render('create-account', { pageName: 'Create Account' })
}

const getLogin = (req, res, next) => {
  const { error } = res.locals.messages
  // console.log(res.locals.messages)
  res.render('login', { pageName: 'Sign in - UpTask', error })
}

const postCreateAccount = async (req, res, next) => {
  const { email, password } = req.body

  try {
    await User.create({ email, password })

    // Create URL to confirm
    const confirmUrl = `http://${req.headers.host}/confirm/${email}`

    // Create user object
    const user = { email }

    // Send E-mail

    await sendRecoveryToken({
      user,
      subject: 'Confirm UpTask account',
      confirmUrl,
      file: 'confirm-account',
    })

    // Redirect
    req.flash('correcto', "We've sent an E-mail, confirm your account")
    res.redirect('/login')
  } catch (error) {
    req.flash(
      'error',
      error.errors.map((error) => error.message)
    )
    res.render('create-account', {
      pageName: 'Create Account',
      messages: req.flash(),
      email,
      password,
    })
  }
}

const getRestorePassword = (req, res, next) => {
  res.render('restore-password', { pageName: 'Restore Password' })
}

module.exports = {
  getCreateAccount,
  postCreateAccount,
  getLogin,
  getRestorePassword,
}
