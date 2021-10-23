const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const helper = require('./test_helper');
const User = require('../models/user');
const Review = require('../models/review');

beforeEach(async () => {
    await User.deleteMany({});

    const testUser = {
        username: 'testUsername',
        password: 'testPassword',
        name: 'testName',
    };

    await api.post('/signUp').send(testUser).expect('Content-type', /application\/json/);
    
    await Review.deleteMany({});

    const newReviewObjects = helper.initialReviews.map(r => new Review(r));
    const promiseArray = newReviewObjects.map(r => r.save());
    await Promise.all(promiseArray);
});

describe('Testing database', () => {
    test('Obtain every review', async () => {
        const reviews = await api.get('/reviews').expect(200).expect('Content-type', /application\/json/);
        expect(reviews.body).toHaveLength(helper.initialReviews.length);
    });

    test('When a review is posted, the length of the database increases by 1', async () => {
        const newLogin = {
            username: 'testUsername',
            password: 'testPassword',
        };

        const login = await api.post('/login').send(newLogin).expect('Content-type', /application\/json/);

        const newReview = {
            content: 'testContent',
            rating: 100,
            pokemon: {
                name: 'testPokemon',
                sprite: 'testSprite',
            },
        };

        await api.post('/reviews').send(newReview).set('Authorization', `bearer ${login.body.token}`).expect(200).expect('Content-type', /application\/json/);
        const response = await helper.reviewsInDB();
        const content = response.map(r => r.content);

        expect(content).toContain('testContent');
        expect(response).toHaveLength(helper.initialReviews.length + 1);
    });
});

describe('Testing properties', () => {
    test('id is called id, and not called _id', async () => {
        const reviews = await api.get('/reviews');

        const reviewsIds = reviews.body.map(r => r.id);
        const firstReviewsId = reviewsIds[0];
    
        expect(firstReviewsId).toBeDefined();
    });

    test('when property content is missing, expect status code 400', async () => {
        const newLogin = {
            username: 'testUsername',
            password: 'testPassword',
        };

        const login = await api.post('/login').send(newLogin).expect('Content-type', /application\/json/);

        const newReview = {
            rating: 0,
            pokemon: {
                name: 'testPokemon1',
                sprite: 'testSprite1',
            },
        };

        await api.post('/reviews').send(newReview).set('Authorization', `bearer ${login.body.token}`).expect(400);
        
        const response = await helper.reviewsInDB();
        expect(response).toHaveLength(helper.initialReviews.length);
    });

    test('deleting a review', async () => {
        const newLogin = {
            username: 'testUsername',
            password: 'testPassword'
        }

        const login = await api.post('/login').send(newLogin).expect('Content-type', /application\/json/)
        
        const newReview = {
            content: 'testDelete',
            rating: 0,
            pokemon: {
                name: 'testDeletePokemon',
                sprite: 'testDeleteSprite',
            },
        };
        await api.post('/reviews').send(newReview).set('Authorization', `bearer ${login.body.token}`).expect(200).expect('Content-type', /application\/json/);

        const reviews = await helper.reviewsInDB()

        await api.delete(`/reviews/${reviews[2].id}`).set('Authorization', `bearer ${login.body.token}`).expect(204);

        const reviewsAfterDeleting = await helper.reviewsInDB();
        const reviewContent = reviewsAfterDeleting.map(r => r.content);
        expect(reviewContent).not.toContain(reviews[2].content);
        expect(reviewsAfterDeleting).toHaveLength(helper.initialReviews.length);
    });
});

afterAll(() => {
    mongoose.connection.close();
});