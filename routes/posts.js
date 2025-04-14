const router = require('express').Router();
const Post = require('../models/post.js');
const User = require('../models/user.js');
const AppError = require('../utils/AppError');
const {verifyToken} = require('../middlewares/auth.js');
router.get('/', async (req, res) => {
    const posts = await Post.find().populate('author', 'username').populate('likes', 'username').populate('comments.author', 'username');
    res.json(posts);
})
router.get('/user/:id',verifyToken , async (req, res) => {
    const posts = await Post.find({ author: req.params.id }).populate('author', 'username').populate('likes', 'username').populate('comments.author', 'username');
    res.json(posts);
})

router.get('/:id',verifyToken, async (req, res) => {
    const post = await Post.findById(req.params.id).populate('author', 'username').populate('likes', 'username').populate('comments.author', 'username');
    if (!post) {
        return new AppError('Post not found', 404);
    }
    res.json(post);
})

router.post('/',verifyToken, async (req, res) => {
    const { title, content, author, tags } = req.body;
    const post = new Post({ title, content, author, tags });
    await post.save();
    res.status(201).json(post);
})

router.post('/:id/comments', async (req, res) => {
    const { content, author } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) {
        return new AppError('Post not found', 404);
    }
    const comment = { content, author };
    post.comments.push(comment);
    await post.save();
    res.status(201).json(post);
})

router.put('/:id', async (req, res) => {
    const { title, content } = req.body;
    const post = await Post.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
    if (!post) {
        return new AppError('Post not found', 404);
    }
    res.json(post);
})


router.delete('/:id', async (req, res) => {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
        return new AppError('Post not found', 404);
    }
    res.json({ message: 'Post deleted' });
})
module.exports = router;
