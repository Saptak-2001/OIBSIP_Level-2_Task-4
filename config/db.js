const mongoose = require("mongoose");
const colors = require('colors');

const connectDB = async() => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Database connected successsfully ${connect.connection.host}`.bgMagenta.white);
    } catch (error) {
        console.log(`Error in Mongodb connection!! ${error}`.bgRed.white);
    }
}

module.exports = connectDB;