const express = require('express')
const router = express.Router()
const {getTasks, setTask, updateTask, assignTaskTo, deleteTask} = require('../controllers/tasksController')
const {protect} = require('../middleware/authMiddleware')

router.get('/',protect, getTasks)

router.post('/', protect,setTask)

router.put('/:id', protect,updateTask)

router.put('/:taskId', protect, assignTaskTo)

router.delete('/:id', protect, deleteTask)

module.exports = router