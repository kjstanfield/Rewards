// src/routes/index.js
const router = require('express').Router()
const mongoose = require('mongoose')
module.exports = router

/*************************
 * Create
 *************************/
router.post('/emp', function (req, res, next) {
  const Emp = mongoose.model('Emp')
  const empData = {
    name: req.body.name,
    id: req.body.id,
    coins: req.body.coins
  }

  Emp.create(empData, function (err, newEmp) {
    if (err) {
      console.error(err)
      return res.status(500).json(err)
    }

    res.json(newEmp)
  })
})

/*************************
 * Read
 *************************/
router.get('/emp/:empId', function (req, res, next) {
  const { empId } = req.params
  // same as 'const empId = req.params.empId'

  const fixedEmpId = empId.toUpperCase()
  const emp = EMPLOYEES.find(entry => entry.id === fixedEmpId)
  if (!emp) {
    return res.status(404).end(`Could not find emp '${fixedEmpId}'`)
  }

  res.json(emp)
})

/*************************
 * Update
 *************************/
router.put('/emp/:empId', function (req, res, next) {
  const data = req.body
  console.log('PUT DATA', data)

  res.end(`Updating emp '${req.params.empId}'`)
})

/*************************
 * Delete
 *************************/

router.delete('/emp/:empId', function (req, res, next) {
  res.end(`Deleting emp '${req.params.empId}'`)
})

/*************************
 * List
 *************************/
router.get('/emp', function (req, res, next) {
  mongoose.model('Emp').find({}, function (err, emps) {
    if (err) {
      console.log(err)
      return res.status(500).json(err)
    }

    res.json(emps)
  })
})
