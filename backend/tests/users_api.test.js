const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const helper = require('./test_helper');
const bcrypt = require('bcrypt');
const User = require('../models/user');

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({});

        const passwordHash = await bcrypt.hash('passwordSecret', 10);
        const user = new User({ username: 'rootUsernameTest', passwordHash, name: 'rootNameTest' });
        await user.save();
    });

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDB();

        const newUser = {
            username: 'testUsername',
            password: 'testPassword',
            name: 'testName',
        };

        await api.post('/signUp').send(newUser).expect(200).expect('Content-type', /application\/json/);

        const usersAtEnd = await helper.usersInDB();
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
        const usernames = usersAtEnd.map(users => users.username);
        expect(usernames).toContain(newUser.username);
    });

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDB();
    
        const newUser = {
          username: 'rootUsernameTest',
          password: 'testPassword',
          name: 'testName',
        };
    
        const result = await api.post('/signUp').send(newUser).expect(400).expect('Content-Type', /application\/json/)
    
        expect(result.body.error).toContain('username must be unique');
        const usersAtEnd = await helper.usersInDB();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });

    test('creation fails with proper statuscode and message if username is too short', async () => {
        const usersAtStart = await helper.usersInDB();

        const newUser = {
            username: 'test',
            password: 'test',
            name: 'testName',
        };

        const result = await api.post('/signUp').send(newUser).expect(400).expect('Content-Type', /application\/json/)
    
        expect(result.body.error).toContain('username is too short');
        const usersAtEnd = await helper.usersInDB();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });

    test('creation fails with proper statuscode and message if username is missing', async () => {
        const usersAtStart = await helper.usersInDB();

        const newUser = {
            password: 'testPassword',
            name: 'testName',
        };

        const result = await api.post('/signUp').send(newUser).expect(400).expect('Content-Type', /application\/json/)
    
        expect(result.body.error).toContain('username or password missing');
        const usersAtEnd = await helper.usersInDB();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });

    test('creation fails with proper statuscode and message if name is missing', async () => {
        const usersAtStart = await helper.usersInDB();

        const newUser = {
            username: 'testUsername',
            password: 'testPassword',
        };

        const result = await api.post('/signUp').send(newUser).expect(400).expect('Content-Type', /application\/json/)
    
        expect(result.body.error).toContain('name missing');
        const usersAtEnd = await helper.usersInDB();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });
})

afterAll(() => {
    mongoose.connection.close()
});