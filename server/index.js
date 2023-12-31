const express =  require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
connectDB()

// console.log(process.version);

const port = process.env.PORT || 5000

const app = express()

app.use(express.json)
app.use(express.urlencoded({extended: false}))
app.use(errorHandler)

app.use('/api/tasks', require('./routes/tasksRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.listen(port, () => {
    console.log(`server running on port ${port}`);
})
