const { Router } = require('express')
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profiles')
const User = require('../../models/Users')
const { check, validationResult } = require('express-validator')
const ExperienceRoute = require('./experience').route

route = Router()

//GET /api/profiles/me => private => getting our profile
route.get('/me' ,auth ,async (req, res) => {
    try{
        const profile = await Profile.findOne({ user:req.user.id }).populate('user',['name', 'avatar'])

        if(!profile){
            res.status(400).json({msg: 'There is no such Profile'})
        }

        res.json(profile)
    }catch(err){
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})


//Post /api/profile => private => creating or updating a profile
route.post('/' , [auth , [
    check('status','Status is required').not().isEmpty(),
    check('skills','Skills are required').not().isEmpty()
] ] ,async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        twitter,
        facebook,
        instagram,
        linkedin
    } = req.body

//    Build profile obj
    const profileFields = {}
    profileFields.user = req.user.id
    if(company)  profileFields.company = company
    if(website)  profileFields.website = website
    if(location)  profileFields.location = location
    if(bio)  profileFields.bio = bio
    if(status)  profileFields.status = status
    if(githubusername)  profileFields.githubusername = githubusername

    if(skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim())
    }

    profileFields.social = {}
    if(youtube)  profileFields.social.youtube = youtube
    if(twitter)  profileFields.social.twitter = twitter
    if(facebook)  profileFields.social.facebook = facebook
    if(instagram)  profileFields.social.instagram = instagram
    if(linkedin)  profileFields.social.linkedin = linkedin

    try{
        let profile = await Profile.findOne({ user: req.user.id })
        //Update
        if(profile){
            profile = await Profile.findOneAndUpdate({user: req.user.id,},{ $set: profileFields},{new:true})
            res.json(profile)
        }

        // Create
        profile = new Profile(profileFields)

        await profile.save()
        res.json(profile)

    }
    catch (err) {
        console.error(err.message)
        res.status(500).send("Server error")
    }
})


//Get /api/profiles =>public => getting all profiles
route.get('/',async (req, res) => {
    try{
        const profiles = await Profile.find().populate('user',['name','avatar'])
        res.json(profiles)
    }catch (err) {
        console.error(err.message)
        res.status(500).send("server Error")
    }
})


//Get /api/profiles/user/:user_id => private => getting user profile by user id
route.get('/user/:user_id',async (req, res) => {
    try{
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user',['name','avatar'])

        if(!profile){
            return res.status(400).json({msg: 'Profile not found'})
        }

        res.json(profile)
    }catch (err) {
        console.error(err.message)
        if(err.kind == 'ObjectID'){
            return res.status(400).json({msg: 'Profile not found'})
        }
        res.status(500).send("server Error")
    }
})


//Delete /api/profile => private => delete profile, user and posts
route.delete('/', auth , async (req, res) => {
    try{
        //Remove Profile,User and TODO => remove user's posts
        await Profile.findOneAndRemove({ user: req.user.id })
        await User.findOneAndRemove({ _id: req.user.id })
        res.json({msg: 'User Deleted'})
    }catch (err) {
        console.error(err.message)
        res.status(500).send("server Error")
    }
})

//Put /api/profile/experience => private => adding experience to profile
route.use('/experience',ExperienceRoute)

module.exports = { route }