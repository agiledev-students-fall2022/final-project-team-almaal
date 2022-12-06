process.env.NODE_ENV = "test"

// include the testing dependencies
const chai = require("chai")
const chaiHttp = require("chai-http")
chai.use(chaiHttp) // use the chai-http middleware to simplify testing routes
const expect = chai.expect // the assertion library in the style using the word 'expect'
const should = chai.should() // the same assertion library in the style using the word 'should'

const app = require("../app")


describe("Login", () => {
    /**
     * test the POST /login route
     */
    const formData = {
        email: 'dsdsdf@gmail.com',
        password: '12345678'
    } // mock form data with correct credentials
    describe("POST /api/auth with correct username/password", () => {
        it("it should return a 200 HTTP response code", done => {
            chai
                .request(app)
                .post("/api/auth")
                .type("json")
                .send(formData)
                .end((err, res) => {
                    res.should.have.status(200) // use 'should' to make BDD-style assertions
                    done() // resolve the Promise that these tests create so mocha can move on
                })
        })
    })

    describe("POST /login with correct username but incorrect password", () => {
        const formData = { email: "abc@gmail.com", password: "bar" } // mock form data with correct credentials
        it("it should return a 401 HTTP response code", done => {
            chai
                .request(app)
                .post("/login")
                .type("form")
                .send(formData)
                .end((err, res) => {
                    res.should.have.status(400) // use 'should' to make BDD-style assertions
                    done() // resolve the Promise that these tests create so mocha can move on
                })
        })
    })

    describe("POST /login with incorrect username and password user does not exist", () => {
        const formData = { email: "abcd@gmail.com", password: "bar" } // mock form data with correct credentials
        it("it should return a 400 HTTP response code", done => {
            chai
                .request(app)
                .post("/login")
                .type("form")
                .send(formData)
                .end((err, res) => {
                    res.should.have.status(401) // use 'should' to make BDD-style assertions
                    done() // resolve the Promise that these tests create so mocha can move on
                })
        })
    })
})