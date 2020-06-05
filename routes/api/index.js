const { Router } = require('express')

const postsRoute = require('./posts').route
const profilesRoute = require('./profiles').route
const usersRoute = require('./users').route
const authRoute = require('./auth').route

const route = Router()

//Routes from /api/
route.use('/posts', postsRoute)
route.use('/profile', profilesRoute)
route.use('/users', usersRoute)
route.use('/auth', authRoute)

module.exports = { route }