const asyncHandler = require('express-async-handler')
const Tasks = require('../models/taskModel')
const User = require('../models/userModel')


const getTasks = asyncHandler(async(req,res) => {
    const tasks = await Tasks.find({
        user: req.user.id
    })

    res.status(200).json(tasks)
})

const setTask = asyncHandler(async(req,res) => {
    const task = req.body.text

    if (task) {
        const tasks = await Tasks.create({
            text: req.body.text,
            user: req.user.id
        })
    
        res.status(200).json(tasks)
    } else {
        res.status(400)
        throw new Error('Please enter a task to be added!')
    }
    
})

const updateTask = asyncHandler(async(req,res) => {
    const taskId = req.params.id
    const toBeUpdated = req.body.toBeUpdated

    const task = await Tasks.findById(taskId)

    if (!task) {
        res.status(400)
        throw new Error('No data found!')
    }

    const user = await User.findById(req.user.id)

    // check for user 
    if (!user) {
        res.status(401)
        throw new Error('User not authorized')
    }

    // make sure the logged in user matches the task created user
    if (task.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedTask = await Tasks.findAndUpdate(taskId, {
        text: toBeUpdated,
        user : req.user.id
    }, 
    {
        new: true
    }
    )

    res.status(200).json(updatedTask)
})

const deleteTask = asyncHandler(async(req,res) => {
    const taskId = req.params.id
    const task = await Tasks.findById(taskId)

    if (!task) {
        res.status(400)
        throw new Error('No data found!')
    }

    const user = await User.findById(req.user.id)

    // check for user 
    if (!user) {
        res.status(401)
        throw new Error('User not authorized')
    }

    // make sure the logged in user matches the task created user
    if (task.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await task.remove()

    res.status(200).json({id: taskId})
})


module.exports = {
    getTasks,
    setTask,
    updateTask,
    deleteTask
}