process.env.NODE_ENV = "test"

// include the testing dependencies
const chai = require("chai")
const chaiHttp = require("chai-http")
chai.use(chaiHttp) // use the chai-http middleware to simplify testing routes
const expect = chai.expect // the assertion library in the style using the word 'expect'
const should = chai.should() // the same assertion library in the style using the word 'should'

const app = require("../app")

describe('API /feed', () => {

    describe('Get / should return status 200', () =>{
        it('it should return 200', (done) => {
            chai.request(app)
                .get('/groups')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    })

    describe('Get / should return json object with key feed', ()=>{
        it('it should have feed key', (done) => {
            chai.request(app)
                .get('/groups')
                .end((err, res) => {
                    expect(res.body).to.have.all.keys('feed');
                    done();
                })
        })
    })

});