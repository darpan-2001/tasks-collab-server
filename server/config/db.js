const mongoose = require('mongoose')


const connectDB = async() => {
    console.log(0);
    try {
        const dbConnection = await mongoose.connect(process.env.DB_URL)

        console.log("DB connected");
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = connectDB