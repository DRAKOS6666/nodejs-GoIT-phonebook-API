const request = require('supertest')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const app = require('../src/app')
const { User, contacts, newContact } = require('../model/__mocks__/data')

const SECRET_KEY = process.env.JWT_SECRET
const issueToken = (payload, secret) => jwt.sign(payload, secret)
const token = issueToken({ id: User._id }, SECRET_KEY)
User.token = token
console.log('token', token)

jest.mock('../model/contact-model.js')
jest.mock('../model/user-model.js')

describe('Testing the route api/contacts', () => {
    let idNewContact
    describe('should handle get request', () => {
        test('should return 200 status for get all contacts', async (done) => {
            const res = await request(app).get('/api/contacts').set('Authorization', `Bearer ${token}`)

            expect(res.status).toEqual(200)
            expect(res.body).toBeDefined()
            expect(res.body.data.contacts).toBeInstanceOf(Array)
            done()
        })
        test('should return 200 status by id', async (done) => {
            const contact = contacts[0]
            const res = await request(app).get(`/api/contacts/${contact._id}`).set('Authorization', `Bearer ${token}`)

            expect(res.status).toEqual(200)
            expect(res.body).toBeDefined()
            expect(res.body.data.contact).toHaveProperty('_id')
            expect(res.body.data.contact._id).toBe(contact._id)
            done()
        })
        test('should return 400 status by wrong id', async (done) => {
            const wrongId = "fesrsafnesrj"
            const res = await request(app).get(`/api/contacts/${wrongId}`).set('Authorization', `Bearer ${token}`)

            expect(res.status).toEqual(400)
            expect(res.body).toBeDefined()
            done()
        })
        test('should return 404 status, contact id not found', async (done) => {
            const wrongId = "5eb074232c30a1378dacdbd4"
            const res = await request(app).get(`/api/contacts/${wrongId}`).set('Authorization', `Bearer ${token}`)

            expect(res.status).toEqual(404)
            expect(res.body).toBeDefined()
            done()
        })
    })


    describe('should handle post request', () => {
        test('should return 201 status contact created', async (done) => {
            const res = await request(app)
                .post('/api/contacts')
                .set('Authorization', `Bearer ${token}`)
                .send(newContact)
                .set('Accept', 'application/json')

            expect(res.status).toEqual(201)
            expect(res.body).toBeDefined()
            idNewContact = res.body.data.contact._id
            done()
        })
        test('should return 400 status is wrong field', async (done) => {
            const res = await request(app)
                .post('/api/contacts')
                .set('Authorization', `Bearer ${token}`)
                .set('Accept', 'application/json')
                .send({ ...newContact, wrongField: "wrong" })

            expect(res.status).toEqual(400)
            expect(res.body).toBeDefined()
            done()
        })
        test('should return 400 status without required field name', async (done) => {
            const res = await request(app)
                .post('/api/contacts')
                .set('Authorization', `Bearer ${token}`)
                .send({ phone: 1345494312 })
                .set('Accept', 'application/json')
            expect(res.status).toEqual(400)
            expect(res.body).toBeDefined()
            done()
        })
        test('should return 400 status without required field phone', async (done) => {
            const res = await request(app)
                .post('/api/contacts')
                .set('Authorization', `Bearer ${token}`)
                .set('Accept', 'application/json')
                .send({ name: "Petrunko" })

            expect(res.status).toEqual(400)
            expect(res.body).toBeDefined()
            done()
        })
    })
    describe('should handle put request', () => {
        test('should return 200 status contact update', async (done) => {
            const res = await request(app)
                .patch(`/api/contacts/${idNewContact}`)
                .set('Authorization', `Bearer ${token}`)
                .send({ name: "Djekki Chin" })
                .set('Accept', 'application/json')

            expect(res.status).toEqual(200)
            expect(res.body).toBeDefined()
            expect(res.body.data.contact.name).toBe('Djekki Chin')
            done()
        })
        test('should return 400 status is wrong field', async (done) => {
            const res = await request(app)
                .patch(`/api/contacts/${idNewContact}`)
                .set('Authorization', `Bearer ${token}`)
                .set('Accept', 'application/json')
                .send({ wrongField: "wrong" })

            expect(res.status).toEqual(400)
            expect(res.body).toBeDefined()
            done()
        })
        test('should return 400 status with wrong id', async (done) => {
            const res = await request(app)
                .patch('/api/contacts/11111')
                .set('Authorization', `Bearer ${token}`)
                .send({ phone: 1345494312 })
                .set('Accept', 'application/json')
            expect(res.status).toEqual(400)
            expect(res.body).toBeDefined()
            done()
        })

    })
    describe('should handle patch request', () => { })
    describe('should handle delete request', () => { })
})