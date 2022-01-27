const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')
const db = require('../config/db')

const Project = require('../models/Project')

const User = db.define(
  'User',
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
        msg: 'Email already registered',
      },
      validate: {
        isEmail: {
          msg: 'Add a valid Email',
        },
        notEmpty: {
          msg: "Email can't be empty",
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
  },
  {
    hooks: {
      async beforeCreate(user) {
        const hashedPassword = await bcrypt.hash(user.password, 10)
        user.password = hashedPassword
      },
    },
  }
)

User.hasMany(Project)

module.exports = User
