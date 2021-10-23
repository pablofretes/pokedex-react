const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const bcrypt = require('bcrypt');
const User = require('../models/user');

describe('login testing when there is one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({});

        const passwordHash = await bcrypt.hash('passwordSecret', 10);
        const user = new User({ username: 'rootUsernameTest', passwordHash, name: 'rootNameTest' });
        await user.save();
    });

    test('login succeeds with correct user and token exists', async () => {
        const newLogin = {
            username: 'rootUsernameTest',
            password: 'passwordSecret',
        };

        const login = await api.post('/login').send(newLogin).expect('Content-type', /application\/json/);

        expect(login.body.token).toBeDefined();
    });

    test('login fails with proper statuscode if credentials are incorrect', async () => {
        const newLogin = {
            username: 'rootUsernameTest',
            password: 'passwordIncorrect',
        };

        const login = await api.post('/login').send(newLogin).expect(401).expect('Content-type', /application\/json/);

        expect(login.body.token).not.toBeDefined();
    });
});

afterAll(() => {
    mongoose.connection.close()
});