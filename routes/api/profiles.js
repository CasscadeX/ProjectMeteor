const { Router } = require('express')

const route = Router()

route.get('/',(req,res)=>{
    res.send('Profile Route')
})

module.exports = { route }