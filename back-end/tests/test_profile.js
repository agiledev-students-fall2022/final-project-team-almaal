// const { expect } = require('chai');
// const chai = require('chai')
// chai.use(require('chai-http'))

// const { app } = require("../app")

process.env.NODE_ENV = "test"

// include the testing dependencies
const chai = require("chai")
const chaiHttp = require("chai-http")
chai.use(chaiHttp) // use the chai-http middleware to simplify testing routes
const expect = chai.expect // the assertion library in the style using the word 'expect'
const should = chai.should() // the same assertion library in the style using the word 'should'

const app = require("../app")

describe('Profile', () => {
    it('it should return 200', (done) => {
        chai.request(app)
            .post('/profile/update')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
});
