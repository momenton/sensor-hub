import { expect } from 'chai';
import app from '../../server/app';
import request from 'supertest';

describe('Base API Test', () => {
  it('should return 405 method not allowed for random API hits', done => {
    let randomString = Math.random()
      .toString(36)
      .substr(2, 5);

    request(app)
      .get(`/api/${randomString}`)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(405);
        expect(res.body.errors[0]).to.be.equal('Method Not Allowed');

        done();
      });
  });
});
