const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    content: String,
    rating: Number,
    pokemon: {
        name: String,
        sprite: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});

//THIS TRANSFORMS THE MONGOOSE PROPERTY _id TO JUST id, BECAUSE _id IS ANNOYING!, THEN IT DELETES _id AND __v
schema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Review = mongoose.model('Review', schema);

module.exports = Review;