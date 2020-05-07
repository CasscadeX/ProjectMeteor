const express = require('express')
const connectDB = require('./data/db')
const apiRoute = require('./routes/api').route

const app = express()

//DB connect
connectDB()

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//routes
app.use('/api',apiRoute)

//assigning the PORT
const PORT = process.env.PORT || 5555;

app.listen(PORT,()=>{
    console.log(`started at http://localhost:${PORT}`)
})