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
      res.render('signup', { title: 'Signup - UpTask', errors: error.errors })
    }
  }
}

module.exports = new UsersController()
