const { Router } = require('express')
const auth = require('../../middleware/auth')
const User = require('../../models/Users')
const Post = require('../../models/Post')
const { check, validationResult } = require('express-validator')
const checkObjectId = require('../../middleware/checkObjectId');

route = Router()

//POST /api/posts => private => create a Post
route.post('/', [ auth, [
    check('text','Text is required').not().isEmpty()
]],async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    try{
        const user = await User.findById(req.user.id).select('-password')

        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        })

        const post = await newPost.save()

        return res.json(post)
    }catch (err) {
        console.error(err.message)
        return res.status(500).send("Server error")
    }
})

//GET /api/posts => private => getting all posts
route.get('/',auth, async (req, res) => {
    try{
        const posts = await Post.find().sort({date: -1})
        return res.json(posts)
    }catch (err) {
        console.error(err.message)
        return res.status(500).send('Server error')
    }
})

//GET /api/posts/:post_id => private => getting post by id
route.get('/:id',[auth, checkObjectId], async (req, res) => {
    try{
        const post = await Post.findById(req.params.id)
        if(!post){
            return res.status(404).json({msg: 'Post not found'})
        }
        return res.json(post)
    }catch (err) {
        console.error(err.message)
        return res.status(500).send("server Error")
    }
})

//DELETE /api/posts/:post_id => private => Delete a post
route.delete('/:id',[auth, checkObjectId], async (req, res) => {
    try{
        const post = await Post.findById(req.params.id)

        if(!post){
            return res.status(400).json({msg: 'Post not found'})
        }
        //Check on user
        if(post.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'User not Authorised'})
        }

        await post.remove()

        return res.json({msg: 'Post removed'})
    }catch (err) {
        console.error(err.message)

        return res.status(500).send("server Error")
    }
})

//PUT /api/post/like/:id => private => Like a Post
route.put('/like/:id', [auth, checkObjectId], async (req, res) => {
    try{
        const post = await Post.findById(req.params.id)

        if(post.likes.filter((like)=>like.user.toString() === req.user.id)){
            return res.status(400).json({msg: 'Post already Liked'})
        }
        post.likes.unshift({user: req.user.id})

        await post.save()

        return res.json(post.likes)
    }catch (err) {
        console.error(err.message)
        return res.status(500).send('Server error')
    }
})

//PUT /api/post/unlike/:id => private => Unlike a Post
route.put('/unlike/:id', [auth, checkObjectId], async (req, res)=> {
    try{
        const post = await Post.findById(req.params.id)

        if(post.likes.filter((like)=>like.user.toString() === req.user.id)){
            return res.status(400).json({msg: 'Post not Liked yet'})
        }
        post.likes = post.likes.filter(
            ({ user }) => user.toString() !== req.user.id
        );

        await post.save()

        return res.json(post.likes)
    }catch (err) {
        console.error(err.message)
        return res.status(500).send('Server error')
    }
})

//POST /api/posts/comment/:id => private => Comment on a Post
route.post('/comment/:id', [ auth, checkObjectId, [
    check('text','Text is required').not().isEmpty()
]],async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    try{
        const user = await User.findById(req.user.id).select('-password')
        const post = await Post.findById(req.params.id)

        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        }

        post.comments.unshift(newComment)

        await post.save()

        return res.json(post.comments)
    }catch (err) {
        console.error(err.message)
        return res.status(500).send("Server error")
    }
})

//DELETE /api/posts/comment/:id/:comment_id => private => Comment on a Post
route.delete('/comment/:id/:comment_id', auth ,async (req, res) => {
    try{
        const post = await Post.findById(req.params.id)

        const comment = post.comments.find((comment)=> comment.id === req.params.comment_id)

        if(!comment){
            return res.status(404).json({msg: 'Comment does not exist'})
        }

        if(comment.user.toString() !== req.user.id){
            return res.status(401).json({msg:'User not authorised'})
        }

        post.comments = post.comments.filter(
            ({ id }) => id !== req.params.comment_id
        );

        await post.save()

        return res.json(post.comments)
    }catch (err) {
        console.error(err.message)
        return res.status(500).send("Server error")
    }
})

module.exports = { route }