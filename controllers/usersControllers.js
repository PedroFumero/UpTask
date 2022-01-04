const User = require('../models/User')

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

module.exports = {
  getCreateAccount,
  postCreateAccount,
  getLogin,
}
