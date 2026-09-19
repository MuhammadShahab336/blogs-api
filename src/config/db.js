const mongoose = require("mongoose");


const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)

        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
        process.exit(1);
    }
}

module.exports = connectDb;