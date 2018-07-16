// src/server.js

const router = require('./routes')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config')
const authRoutes = require('./routes/auth-routes')
const passport = require('passport')
const passportSetup = require('./config/passport-setup')
const cookieSession = require('cookie-session')

// Load mongoose package
const mongoose = require('mongoose')

// Connect to MongoDB and create/use database as configured
mongoose.connection.openUri(`mongodb://${config.db.username}:${config.db.password}@${config.db.host}/${config.db.dbName}`)

const app = express()

// Initialize passport
app.use(passport.initialize())
app.use(passport.session())

// Import all models
require('./models/emp.model.js')

const publicPath = path.resolve(__dirname, '../public')
app.use(express.static(publicPath))
app.use(bodyParser.json())
app.use('/api', router)
app.use('/auth', authRoutes)
app.use(cookieSession({
  // Set cookie age to 1 day
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.COOKIE_KEY]
}))

app.listen(config.port, function () {
  console.log(`${config.appName} is listening on port ${config.port}`)
})
