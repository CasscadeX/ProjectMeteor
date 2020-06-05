const express = require('express')
const connectDB = require('./data/db')
const apiRoute = require('./routes/api').route
const path = require('path');

const app = express()

//DB connect
connectDB()

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//routes
app.use('/api',apiRoute)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

//assigning the PORT
const PORT = process.env.PORT || 5555;

app.listen(PORT,()=>{
    console.log(`started at http://localhost:${PORT}`)
})