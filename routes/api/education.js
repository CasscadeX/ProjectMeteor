const { Router } = require('express')
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profiles')
const User = require('../../models/Users')
const { check, validationResult } = require('express-validator')

route = Router()

//PUT /api/profile/education => private => adding education to profile
route.put('/', [auth, [
    check('school','School is required').not().isEmpty(),
    check('degree','Degree is required').not().isEmpty(),
    check('fieldofstudy','Field of Study is required').not().isEmpty(),
    check('from','From date is required').not().isEmpty().custom((value, { req }) => (req.body.to ? value < req.body.to : true))
]] ,async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const { school, degree, fieldofstudy, from, to, current, description } = req.body

    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }

    try{
        const profile = await Profile.findOne({ user: req.user.id })
        profile.education.unshift(newEdu)
        await profile.save()
        return res.json(profile)
    }catch (err) {
        console.error(err.message)
        return res.status(500).send("Server error")
    }

})

//DELETE /api/profile/education/:edu_id => private => deleting an education
route.delete('/:edu_id', auth, async (req, res) => {
    try {
        const foundProfile = await Profile.findOne({ user: req.user.id });
        foundProfile.education = foundProfile.education.filter(
            (edu) => edu._id.toString() !== req.params.edu_id
        );
        await foundProfile.save();
        return res.status(200).json(foundProfile);
    } catch (err) {
        console.error(err.message)
        return res.status(500).send("Server error")
    }
})

module.exports = { route }