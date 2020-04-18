const { Router } = require('express')
const { check, validationResult } = require('express-validator')

const User = require('../../models/User')

const route = Router()

route.post('/',
    [
    check('name','Name is required').not().isEmpty(),
    check('email','Please give a valid eMail'),
    check('password','Please provide passwords with atleast 6 characters').isLength({min: 6})
],
    async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
         return res.status(400).json({ errors: errors.array()})
    }

    const { name, email, password } = req.body

     try{
         let user = await User.findOne({ email })

         if(user){
             res.status(400).json({ errors: [{msg: 'User already exist'}]})
         }
     }catch(err){
         console.error(err)
         res.status(500).send('Server Error')
     }

    res.send('User Route')
})

module.exports = { route }