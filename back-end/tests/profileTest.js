process.env.NODE_ENV = "test"

var chai = require("chai")
var assert = require('assert');
var expect = chai.expect;
var should = chai.should();
var chaiHttp = require('chai-http');

var server = require("../app")

describe("Tests for profile page", () => {

    //test /logout route
    describe("Tests for /profile/logout route",()=>{
        it("it should return 200 http response code",(done)=>{
            chai.request(server)
                .get('/profile/logout')
                .end((err,res)=>{
                    res.should.have.status(200);
                    done()
                })
        })
    })

    // test /update route
    describe("Tests for POST /profile/update route", ()=>{
        it("it should update username of user when username is updated", (done)=>{
            let formData = {
                username: "frank2002"
            }
            chai.request(server)
                .post('/profile/update')
                .send(formData)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.have.property('username').eql(formData.username);
                    done()
                })
        })

        it("it should update password of user when password is updated", (done)=>{
            let formData = {
                password: "newpassword"
            }
            chai.request(server)
                .post('/profile/update')
                .send(formData)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.have.property('password').eql(formData.password);
                    done()
                })
        })

        it("it should update investment visibility of user when investment visibility is updated", (done)=>{
            let formData = {
                investment_visibility: "false"
            }
            chai.request(server)
                .post('/profile/update')
                .send(formData)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.have.property('investment_visibility').eql(formData.investment_visibility);
                    done()
                })
        })

        it("it should update profile visibility of user when profile visibility is updated", (done)=>{
            let formData = {
                profile_visibility: "true"
            }
            chai.request(server)
                .post('/profile/update')
                .send(formData)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.have.property('profile_visibility').eql(formData.profile_visibility);
                    done()
                })
        })
    })
    
})