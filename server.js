const express = require('express')

const app = express()

const PORT = process.env.PORT || 5555

app.listen(PORT,()=>{
    console.log(`started at http://localhost:${PORT}`)
})