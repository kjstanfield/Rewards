// Load mongoose package
const mongoose = require('mongoose')

const EmpSchema = new mongoose.Schema({
  id: String,
  name: String,
  coins: Number,
  created_at: {
    type: Date,
    default: Date.now
  }
})

const Emp = mongoose.model('Emp', EmpSchema)

module.exports = Emp

Emp.count({}, function (err, count) {
  if (err) {
    throw err
  }
  if (count > 0) return

  const emps = require('./emp.seed.json')
  Emp.create(emps, function (err, newEmps) {
    if (err) {
      throw err
    }
    console.log('DB seeded')
  })
})
