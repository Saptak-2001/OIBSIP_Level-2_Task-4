const express = require('express');
const cors = require('cors');
const colors = require('colors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const morgan = require('morgan');

require('dotenv').config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json())
app.use(morgan('dev'));

app.get('/', (req, res) => {
    console.log("Server running successfully");
});

const port = process.env.PORT || 8080;

app.use('/api/auth', authRoutes);

app.listen(port, () => {
    console.log(`Server is running on ${port}`.yellow.bold);
})
