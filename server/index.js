const express =  require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')

const port = process.env.PORT || 5000

const app = express()

app.use(express.json)
app.use(express.urlencoded({extended: false}))
app.use(errorHandler)

app.use('/api/tasks', require('./routes/tasksRoutes'))

app.listen(port, () => {
    console.log(`server running on port ${port}`);
})