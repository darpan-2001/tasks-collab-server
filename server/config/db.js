const mongoose = require('mongoose')


const connectDB = async() => {
    try {
        const dbConnection = await mongoose.connect(process.env.DB_URL)

        console.log("DB connected");
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = connectDB