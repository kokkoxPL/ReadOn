const app = require('../app');
const request = require('supertest');

describe('Read On', () => {
    it('Testing index', (done) => {
        request(app)
            .get('/')
            .expect(200, (err, res) => {
                if (err)
                    return done(err);
                done();
            });
    });

    it('Testing admin', (done) => {
        request(app)
            .post('/admin/login')
            .send({ 'login': process.env.LOGIN, 'password': process.env.PASSWORD })
            .expect(302, (err, res) => {
                expect(res.headers.location).toBe('/admin');
                if (err)
                    return done(err);
                done();
            });
    });
});