// src/server.js

const router = require('./routes')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config')

const app = express()
const publicPath = path.resolve(__dirname, '../public')

app.use(express.static(publicPath))
app.use(function (req, res, next) {
  console.log('req.body BEFORE parsing', req.body)
  next()
})

app.use(bodyParser.json())

app.use(function (req, res, next) {
  console.log('req.body AFTER parsing', req.body)
  next()
})
app.use('/api', router)

app.listen(config.port, function () {
  console.log(`${config.appName} is listening on port ${config.port}`)
})
