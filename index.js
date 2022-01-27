// Native modules
const path = require('path')
// Third party modules
const express = require('express')
const flash = require('connect-flash')

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

// Flash messages
app.use(flash())

// Passing helpers to app
app.use((req, res, next) => {
  res.locals.vardump = helpers.vardump
  next()
})

// Using routes
app.use(routes)

app.use((req, res) => {
  res.status(404).send('Not Found!')
})

app.listen(3000, () => {
  console.log('Server running on port: 3000')
})
