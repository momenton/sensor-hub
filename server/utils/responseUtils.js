import HttpStatus from 'http-status-codes';

const ERRS = {
  'Invalid request body': HttpStatus.BAD_REQUEST,
  'Not found': HttpStatus.NOT_FOUND
};

export const buildError = errMessage => ({
  status: ERRS[errMessage] || HttpStatus.INTERNAL_SERVER_ERROR,
  body: {
    errors: [errMessage]
  }
});

export const buildMethodNotAllowedError = () => ({
  status: HttpStatus.METHOD_NOT_ALLOWED,
  body: {
    errors: [HttpStatus.getStatusText(HttpStatus.METHOD_NOT_ALLOWED)]
  }
});
