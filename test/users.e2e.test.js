const request = require('supertest')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const fs = require('fs').promises

const app = require('../src/app')
const { User, newUser } = require('../model/__mocks__/data')

const SECRET_KEY = process.env.JWT_SECRET
const issueToken = (payload, secret) => jwt.sign(payload, secret)
const token = issueToken({ id: User._id }, SECRET_KEY)
User.token = token
console.log('token', token)

jest.mock('../model/contact-model.js')
jest.mock('../model/user-model.js')

describe('Testing the route api/users', () => {
    test('should return 201 status registration', async (done) => {
        const res = await request(app)
            .post('/api/users/auth/register')
            .send(newUser)
            .set('Accept', 'application/json')

        expect(res.status).toEqual(201)
        expect(res.body).toBeDefined()
        done()
    })
    test('should return 409 status email is alredy registered', async (done) => {
        const res = await request(app)
            .post('/api/users/auth/register')
            .send(newUser)
            .set('Accept', 'application/json')

        expect(res.status).toEqual(409)
        expect(res.body).toBeDefined()
        done()
    })
    test('should return 200 status login', async (done) => {
        const res = await request(app)
            .post('/api/users/auth/login')
            .send(newUser)
            .set('Accept', 'application/json')

        expect(res.status).toEqual(200)
        expect(res.body).toBeDefined()
        done()
    })
    test('should return 200 status upload avatar', async (done) => {
        const buffer = await fs.readFile('./test/blackMan.jpg')
        const res = await request(app)
            .patch('/api/users/avatars')
            .set('Authorization', `Bearer ${token}`)
            .attach('avatar', buffer, './test/blackMan.jpg')

        console.log('res.error.text', res.error)
        expect(res.status).toEqual(200)
        expect(res.body).toBeDefined()
        done()
    })
})