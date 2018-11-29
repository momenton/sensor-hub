import chai, { expect } from 'chai';
import { buildError } from '../../../server/utils/responseUtils';

describe('ResponseUtils tests', () => {
  describe('buildError method', () => {
    it('should return internal server error if error is not defined', () => {
      const error = buildError('some error');

      expect(error).to.deep.equal({
        status: 500,
        body: {
          errors: ['some error']
        }
      });
    });
  });
});
