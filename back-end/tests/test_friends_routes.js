const { expect } = require('chai');
const chai = require('chai')
chai.use(require('chai-http'))

const { app } = require("../app")

describe('API /friends', () => {
    it('it should return 200', (done) => {
        chai.request(app)
            .get('/friends')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
});
