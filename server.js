const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv');
const path = require('path')
const connectDb = require('./config/connectDb');
const newUser = require('./route/userRoute')
const transection = require('./route/transectionRoute')
const app = express();

// config
dotenv.config();

//connect database
connectDb();


app.use(morgan('dev'))
app.use(express.json())
app.use(cors())



// user routes
app.use('/api/v1/users', newUser)

// transection routes
app.use('/api/v1/transection', transection)

// static file
app.use(express.static(path.join(__dirname, './clint/build')))
app.get("*", (req, res) => {
    res.sendFile(path.join('./clint/build/index.html'))
})

// server
const PORT = 8080 || process.env.PORT

// listen server
app.listen(PORT, () => {
    console.log(`Server is runnig on port ${PORT}`);
})