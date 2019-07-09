const app = require('../../../src/app')
const request = require('supertest')

describe('Client Controller', () => {
    it('should be able to create user',  async () => {

        const response = await request(app)
            .post('/clients')
            .send({
                name: 'Testing Client',
                email: 'testing@test.com',
                password: 'testpassword'
            })

        expect(response.status).toBe(200)
    })

    it('should be able to find all users',  async () => {

        const response = await request(app)
            .get('/clients')

        expect(response.status).toBe(200)
    })    
})