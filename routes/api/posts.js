const { Router } = require('express')

const route = Router()

route.get('/',(req,res)=>{
    res.send('Posts Route')
})

module.exports = { route }