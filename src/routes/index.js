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
  const {
    empId
  } = req.params
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
  const Emp = mongoose.model('Emp')
  const empId = req.params.empId

  Emp.findById(empId, function (err, emp) {
    if (err) {
      console.error(err)
      return res.status(500).json(err)
    }
    if (!emp) {
      return res.status(404).json({message: 'Emp not found'})
    }

    emp.coins = req.body.coins

    emp.save(function (err, savedEmp) {
      if (err) {
        console.error(err)
        return res.status(500).json(err)
      }
      res.json(savedEmp)
    })
  })
})

/*************************
 * Delete
 *************************/

router.delete('/emp/:empId', function (req, res, next) {
  const Emp = mongoose.model('Emp')
  const empId = req.params.empId

  Emp.findByIdAndRemove(empId, (err, emp) => {
    if (err) {
      console.log(err)
      return res.status(500).json(err)
    }
    if (!emp) {
      return res.status(404).json({
        message: 'Emp not found'
      })
    }
    const response = { message: 'Employee successfully deleted' }
    return res.status(200).send(response)
  })
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
