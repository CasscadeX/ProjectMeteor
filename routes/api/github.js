const { Router } = require('express')
const axios = require('axios');
const config = require('config')

route = Router()

//Get /api/profile/github/:username => public => for handling github requests
route.get('/:username', async (req, res) => {
    try {
        const uri = encodeURI(
            `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
        )
        const headers = {
            'user-agent': 'node.js',
            Authorization: `token ${config.get('githubToken')}`
        }

        const gitHubResponse = await axios.get(uri, { headers })
        return res.json(gitHubResponse.data);
    } catch (err) {
        console.error(err.message);
        return res.status(404).json({ msg: 'No Github profile found' })
    }
})

module.exports = { route }