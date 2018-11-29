import logger from '../utils/logger';
import { buildError, buildMethodNotAllowedError } from '../utils/responseUtils';

const dispatchError = (res, error) => res.status(error.status).json(error.body);

/**
 * generic error handler
 *
 * @param {Error} err
 * @param {object} req
 * @param {object} res
 * @param {Function} next
 */
// eslint-disable-next-line no-unused-vars
export const genericErrorHandler = (err, req, res, next) => {
  logger.error(err);
  const errorResponse = buildError(err.message);
  dispatchError(res, errorResponse);
};

/**
 * handles method not allowed error only
 *
 * @param {object} req
 * @param {object} res
 */
export const methodNotAllowedHandler = (req, res) => {
  const errorResponse = buildMethodNotAllowedError();
  dispatchError(res, errorResponse);
};
