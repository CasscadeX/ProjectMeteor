const express = require('express')
const connectDB = require('./config/db')
const apiRoute = require('./routes/api')

const app = express()

connectDB()

app.use('/api',apiRoute)

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`Running at http://localhost:${PORT}`)
})
