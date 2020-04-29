const { Router } = require('express')
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profiles')
const User = require('../../models/Users')
const { check, validationResult } = require('express-validator')

route = Router()

//PUT /api/profile/experience => private => adding experience to profile
route.put('/', [auth, [
    check('title','Title is required').not().isEmpty(),
    check('company','Company is required').not().isEmpty(),
    check('from','From date is required').not().isEmpty()
]] ,async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const { title, company, location, from, to, current, description } = req.body

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    try{
        const profile = await Profile.findOne({ user: req.user.id })
        profile.experience.unshift(newExp)
        await profile.save()
        res.json(profile)
    }catch (err) {
        console.error(err.message)
        res.status(500).send("Server error")
    }

})

//DELETE /api/profile/experience/:exp_id => private => deleting an experience
route.delete('/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id })

        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id)
        profile.experience.splice(removeIndex,1)
        await profile.save()
        res.json(profile)
    }catch (err) {
        console.error(err.message)
        res.status(500).send("Server error")
    }
})

module.exports = { route }