const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const mongoURI = "mongodb://127.0.0.1:27017/Notevault";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to the database");
    } catch (error) {
        console.error("Error connecting to database:", error);
        process.exit(1);
    }
}

module.exports = connectToMongo;