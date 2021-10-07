const router = require('express').Router();
const User = require('../models/user');
const Review = require('../models/review');

router.post('/reset', async (request, response) => {
  await User.deleteMany({});
  await Review.deleteMany({});

  response.status(204).end();
});

module.exports = router;