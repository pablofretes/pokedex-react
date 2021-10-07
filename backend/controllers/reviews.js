const jwt = require('jsonwebtoken');
const reviewsRouter = require('express').Router();
const Review = require('../models/review');
const User = require('../models/user');

reviewsRouter.get('/', async (req, res) => {
    const reviews = await Review.find({}).populate('user', { username: 1, name: 1 });
    res.json(reviews);
});

reviewsRouter.post('/', async (req, res) => {
    const body = req.body;
    const token = req.token;
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if(!token || !decodedToken) {
        return res.status(401).json({ error: 'token missing or invalid '});
    };

    const user = await User.findById(decodedToken.id);

    if(!body.content){
        return res.status(400).json({ error: 'content missing' });
    };

    const review = new Review({
        title: body.content,
        pokemon: body.pokemon,
        user: user,
    });

    const savedReview = await review.save();
    user.reviews = user.reviews.concat(savedReview._id);
    await user.save();
    res.json(savedReview);
});

reviewsRouter.put('/:id', async (req, res) => {
    const body = req.body;

    const review = {
        content: body.content,
        pokemon: body.pokemon,
    };

    const reviewToUpdate = await Review.findByIdAndUpdate(req.params.id, review, { new: true });
    res.json(reviewToUpdate);
})

module.exports = reviewsRouter;