// const { expect } = require('chai');
// const chai = require('chai')
// chai.use(require('chai-http'))

// const { app } = require("../app")

process.env.NODE_ENV = 'test';

// include the testing dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp); // use the chai-http middleware to simplify testing routes
const expect = chai.expect; // the assertion library in the style using the word 'expect'
const should = chai.should(); // the same assertion library in the style using the word 'should'

const app = require('../app');

describe('Profile', () => {
    // test /profile route
    describe('Tests for /profile route', () => {
        it('it should return 200', (done) => {
            chai.request(app)
                .get('/profile')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

    //test /logout route
    describe('Tests for /profile/logout route', () => {
        it('it should return 200 http response code', (done) => {
            chai.request(app)
                .get('/profile/logout')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    // test /update route
    describe('Tests for POST /profile/update route', () => {
        // it("it should update username of user when username is updated", (done)=>{
        //     let formData = {
        //         username: "frank2002"
        //     }
        //     chai.request(app)
        //         .post('/profile/update')
        //         .send(formData)
        //         .end((err,res)=>{
        //             res.should.have.status(200);
        //             res.body.should.have.property('username').eql(formData.username);
        //             done()
        //         })
        // })

        // it("it should update password of user when password is updated", (done)=>{
        //     let formData = {
        //         password: "newpassword"
        //     }
        //     chai.request(app)
        //         .post('/profile/update')
        //         .send(formData)
        //         .end((err,res)=>{
        //             res.should.have.status(200);
        //             res.body.should.have.property('password').eql(formData.password);
        //             done()
        //         })
        // })

        it('it should update investment visibility of user when investment visibility is updated', (done) => {
            let formData = {
                investment_visibility: 'false',
            };
            chai.request(app)
                .post('/profile/update')
                .send(formData)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have
                        .property('investment_visibility')
                        .eql(formData.investment_visibility);
                    done();
                });
        });

        it('it should update profile visibility of user when profile visibility is updated', (done) => {
            let formData = {
                profile_visibility: 'true',
            };
            chai.request(app)
                .post('/profile/update')
                .send(formData)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have
                        .property('profile_visibility')
                        .eql(formData.profile_visibility);
                    done();
                });
        });
    });
});
