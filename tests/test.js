const app = require('../app');
const request = require('supertest');
const { expect } = require('chai');

describe('Our application', () => {
    before((done) => {
        app.listen(6969, (err) => {
            if (err)
                return done(err);
            done();
        });
    });

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
            .send({ 'login': 'admin', 'password': 'book' })
            .expect(302, (err, res) => {
                expect(res.headers.location).to.equal('/admin');
                if (err)
                    return done(err);
                done();
            });
    });
});