// Native modules
const path = require('path')
// Third party modules
const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const passport = require('./config/passport')

// Extract from dotenv
require('dotenv').config({ path: 'variables.env' })
const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3000

// Helpers
const helpers = require('./helpers')

// :::::::::::::::::::::::::::::::::
// Conneting DB
const db = require('./config/db')

// Getting and inserting models
require('./models')

// db.sync({ force: true })
db.sync()
  .then(() => {
    console.log('Connection to DB has been established successfully.')
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error)
  })
// :::::::::::::::::::::::::::::::::

// Creating express application
const app = express()

// Enabling view engine
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

// Importing routes
const routes = require('./routes')

// Middlewares
// Enabling static files
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

// Enabling cookies and sessions
app.use(cookieParser())
app.use(
  session({
    secret: 'Im a secret',
    resave: false,
    saveUninitialized: true,
  })
)

// Using passport
app.use(passport.initialize())
app.use(passport.session())

// Flash messages
app.use(flash())

// Passing helpers to app
app.use((req, res, next) => {
  res.locals.vardump = helpers.vardump
  // res.locals.message = req.flash()
  next()
})

// Using routes
app.use(routes)

app.use((req, res) => {
  res.status(404).send('Not Found!')
})

app.listen(PORT, HOST, () => {
  console.log(`Server running on port: ${PORT}`)
})
