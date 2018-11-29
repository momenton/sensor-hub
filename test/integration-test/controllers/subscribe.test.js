import request from 'supertest';
import app from '../../../server/app';

const BASE_URL = '/api/subscribe';

/**
 * Tests for /api/subscribe
 */
describe('Subscribe controller tests', () => {
  it('should return 201 when subscribed successfully', done => {
    request(app)
      .post(BASE_URL)
      .send({})
      .set('Accept', 'application/json')
      .expect(201);

    done();
  });
});
