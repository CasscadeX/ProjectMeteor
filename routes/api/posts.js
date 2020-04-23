const { Router } = require('express')

route = Router()

//GET /api/posts => public
route.get('/',(req, res) => {
    res.send('Posts Route')
})

module.exports = { route }