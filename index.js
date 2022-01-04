const express = require('express')
const path = require('path')
const flash = require('connect-flash')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const passport = require('./config/passport')

// Helpers
const helpers = require('./helper')

// DB connection
const db = require('./config/db')
// Models
const User = require('./models/User')
const Project = require('./models/Project')
const Task = require('./models/Task')

db.sync()
  // db.sync({ force: true })
  .then(() => {
    console.log('Succesful connected to DB')
  })
  .catch((err) => {
    console.log(err)
  })

// Express app
const app = express()

// Settings
// Template engine
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

// Middlewares
// Public folder for static files
app.use(express.static(path.join(__dirname, 'public')))

// Allow inputs for POST method
app.use(express.urlencoded({ extended: false }))

// Adding flash messages
app.use(flash())

app.use(cookieParser())

// Adding sessions
app.use(
  session({
    secret: 'super-secret',
    resave: false,
    saveUninitialized: false,
  })
)

app.use(passport.initialize())
app.use(passport.session())

// Putting vardump on any request
app.use((req, res, next) => {
  res.locals.vardump = helpers.vardump
  res.locals.messages = req.flash()
  next()
})

// Router
const routes = require('./routes')

app.use(routes)

// Server listing on port 3000
app.listen(3000)
