const testingRouter = require('express').Router();
const User = require('../models/user');
const Review = require('../models/review');

testingRouter.post('/reset', async (req, res) => {
  await User.deleteMany({});
  await Review.deleteMany({});

  res.status(204).end();
});

module.exports = testingRouter;