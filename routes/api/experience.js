const { Router } = require('express')
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profiles')
const User = require('../../models/Users')
const { check, validationResult } = require('express-validator')

route = Router()

//Put /api/profile/experience => private => adding experience to profile
route.put('/', auth , (req, res) => {})

module.exports = { route }