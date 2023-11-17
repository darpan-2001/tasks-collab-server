const express = require('express')
const router = express.Router()
const {getTasks} = require('../controllers/tasksController')

router.get('/', getTasks)

router.post('/', )

router.put('/:id', )

router.delete('/:id', )

module.exports = router