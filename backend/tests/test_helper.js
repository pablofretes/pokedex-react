const User = require('../models/user');
const Review = require('../models/review');

const initialReviews = [
    {
        content: 'Very cute cabbage dino!',
        rating: 80,
        pokemon: {
            name: 'bulbasaur',
            sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
        },
    },
    {
        content: 'Very cute electric rat!',
        rating: 99,
        pokemon: {
            name: 'pikachu',
            sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
        },
    },
];

const reviewsInDB = async () => {
    const reviews = await Review.find({});
    return reviews.map(r => r.toJSON());
};

const usersInDB = async () => {
    const users = await User.find({});
    return users.map(u => u.toJSON());
};

module.exports = {
    reviewsInDB,
    usersInDB,
    initialReviews,
}