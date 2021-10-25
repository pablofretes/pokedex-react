const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (req, res) => {
    const body = req.body;

    const user = await User.findOne({ username: body.username});
    //IF THE USERNAME MATCHES WE COMPARE THE HASHED PASSWORD WITH THE PASSWORD INTRODUCED BY THE USER
    const passwordCorrect = user === null ? false : await bcrypt.compare(body.password, user.passwordHash);

    if(!(user && passwordCorrect)){
        //IF THE PASSWORD IS INCORRECT WE RETURN AN ERROR
        return res.status(401).json({ error: 'Invalid username or password' });
    };

    const userForToken = {
        username: user.username,
        id: user._id
    };
    //IF THE PASSWORD IS CORRECT THE USER IS LOGGED IN
    const token = jwt.sign(userForToken, process.env.SECRET);

    res.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;