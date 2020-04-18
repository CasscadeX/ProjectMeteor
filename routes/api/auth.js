const { Router } = require('express')

const route = Router()

route.get('/',(req,res)=>{
    res.send('Auth Route')
})

module.exports = { route }