const { Router } = require('express')

const route = Router()

route.get('/',(req,res)=>{
    res.send('User Route')
})

module.exports = { route }