const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userRouter = require('express').Router();
const User = require('../models/user');

userRouter.post('/', async (req, res) => {
    const body = req.body;

    if(body.username.length < 5){
        return res.status(400).json({ error: 'username is too short' });
    };

    if(body.password.length < 5){
        return res.status(400).json({ error: 'password is too short' });
    };

    if(!body.username || !body.password){
        return res.status(400).json({ error: 'username or password missing' });
    };

    if(!body.name){
        return res.status(400).json({ error: 'name missing' });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);
    
    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
    });

    const savedUser = await user.save();

    res.json(savedUser);
});

userRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('reviews');
    res.json(users);
});

module.exports = userRouter;