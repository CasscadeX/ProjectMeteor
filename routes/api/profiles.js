const { Router } = require('express')

route = Router()

//GET /api/profiles => public
route.get('/',(req, res) => {
    res.send('Profiles Route')
})

module.exports = { route }