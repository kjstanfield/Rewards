// src/routes/index.js
const router = require('express').Router()
const mongoose = require('mongoose')
module.exports = router

const EMPLOYEES = [
  {id: 'KJS6577', name: 'Kyle Stanfield', coins: 8500},
  {id: 'DWD7983', name: 'Dalton Decker', coins: 4000},
  {id: 'CXT5027', name: 'Cody Thompson', coins: 4100},
  {id: 'ELE4032', name: 'Eric Eurton', coins: 2000},
  {id: 'JRW6115', name: 'Josh Woosley', coins: 6500},
  {id: 'JAB4689', name: 'Josh Burke', coins: 3000}

]

/*************************
 * Create
 *************************/
router.post('/emp', function (req, res, next) {
  const data = req.body
  console.log('POST DATA', data)

  res.end('Create a new emp')
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
