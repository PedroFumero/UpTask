const path = require('path')
const express = require('express')

// Helpers
const helpers = require('./helper')

// DB connection
const db = require('./config/db')
// Models
const Project = require('./models/Project')

db.sync()
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

// Putting vardump on any request
app.use((req, res, next) => {
  res.locals.vardump = helpers.vardump
  next()
})

// Allow inputs for POST method
app.use(express.urlencoded({ extended: false }))

// Router
const routes = require('./routes')

app.use(routes)

// Server listing on port 3000
app.listen(3000)
