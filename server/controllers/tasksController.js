const asyncHandler = require('express-async-handler')

const getTasks = asyncHandler(async(req,res) => {
    res.status(200).send({"message": "working good"})
})

const setTask = asyncHandler(async(req,res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('please add a task name')
    } else {
        res.status(200).send({"message": "working good"})
    }
    
})

const updateTask = asyncHandler(async(req,res) => {
    res.status(200).send({"message": "working good"})
})

const deleteTask = asyncHandler(async(req,res) => {
    res.status(200).send({"message": "working good"})
})


module.exports = {
    getTasks,
    setTask,
    updateTask,
    deleteTask
}