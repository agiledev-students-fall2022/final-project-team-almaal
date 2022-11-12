
const assert=require('assert')
process.env.NODE_ENV = "test"

// include the testing dependencies
const chai = require("chai")
const chaiHttp = require("chai-http")
chai.use(chaiHttp) // use the chai-http middleware to simplify testing routes
const expect = chai.expect // the assertion library in the style using the word 'expect'
const should = chai.should() // the same assertion library in the style using the word 'should'

const app = require("../app")
chai.use(chaiHttp)

describe('API /home', () => {
    it('GET/ it should return 200 and get all the data from database to portfoliomonitor', (done) => {
        chai.request(app)
            .get('/home/portfolioData')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    it('GET/ it should return 200 and get all the data from database to portfoliomonitor graph', (done) => {
        chai.request(app)
            .get('/home/portfolioChartData')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    it('POST/ it should return 200 and send updated json object of investment to backend', (done) => {
        const investmentData = { key:'1', ticker: 'Tesla', position: 'SELL', quantity:20, price: 103 } // mock investment data
        chai.request(app)
            .post('/home/')
            .send(investmentData)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

});
