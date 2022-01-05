const bcrypt = require('bcrypt')
const Sequelize = require('sequelize')
const db = require('../config/db')

const Project = require('../models/Project')

const User = db.define(
  'users',
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    email: {
      type: Sequelize.STRING(60),
      allowNull: false,
      unique: {
        msg: 'The E-mail entered has already been registered',
      },
      validate: {
        isEmail: {
          msg: 'Add a valid E-mail',
        },
        notEmpty: {
          msg: "E-mail can't be empty",
        },
      },
    },
    password: {
      type: Sequelize.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password can't be empty",
        },
      },
    },
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    token: { type: Sequelize.STRING },
    expiration: { type: Sequelize.DATE },
  },
  {
    hooks: {
      beforeCreate(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))
      },
    },
  }
)

// Customize methods
User.prototype.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

User.hasMany(Project)

module.exports = User
