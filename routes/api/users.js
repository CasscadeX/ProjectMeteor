const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const User = require('../../models/Users')

route = Router()

//POST /api/users => public => Register a User
//(path,middleware for validation of fields,callback function)
route.post('/',[
    //name, email and password validation
    check('name','Field is Required').not().isEmpty(),
    check('email','Field is Required').isEmail(),
    check('password','Password must be of at least of 6 characters').isLength({min:6})
],async (req, res) => {
    //array of errors
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const { name, email, password } = req.body
    try{
        //to check for pre-existing user
        let user =  await User.findOne({email})
        if(user){
            return res.status(400).json({errors:[{msg: 'User already exist '}]})
        }

        //assigning a default image
        const avatar = gravatar.url(email,{
            s: '200',
            r: 'pg',
            d: 'mm'
        })
        //new instance of user
        user = new User({
            name,
            email,
            avatar,
            password
        })
        //encrypting the password
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password,salt)

        //saving a user
        await user.save()

        //JWT
        const payload = {
            user:{
                id: user.id
            }
        }
        jwt.sign(payload,"secret",{expiresIn:360000},(err,token)=>{
            if(err) {
                throw err
            }
            return res.json({token})
        })
    }catch (err) {
        console.error(err.message)
        return res.status(500).send("Server Error")
    }
})

module.exports = { route }