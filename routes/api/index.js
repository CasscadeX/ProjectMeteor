const { Router } = require('express')

const authRoute = require('./auth').route
const postsRoute = require('./posts').route
const profilesRoute = require('./profiles').route
const usersRoute = require('./users').route

const route = Router()

route.use('/auth',authRoute)
route.use('/posts',postsRoute)
route.use('/profiles',profilesRoute)
route.use('/users',usersRoute)

module.exports = route