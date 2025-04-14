const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const app = express()
require('dotenv').config();
const router = express.Router()
const port = 3000
const postRoutes = require('./routes/posts')
const userRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')


app.use(express.json());
app.use(express.urlencoded());
app.use(morgan("dev"))

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to MongoDB")
}).catch(err => {
    console.error("Error connecting to MongoDB", err)
})


app.use('/users', userRoutes)
app.use('/posts', postRoutes)
app.use('/auth', authRoutes)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})