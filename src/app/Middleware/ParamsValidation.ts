import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { ResponseError } from '../../utils/errors';
import Logger from '../../utils/logger';

/**
 * Middleware ParamsValidation.
 *
 * validates the parameters specified in the route file. If it contain errors, responds with a 422 error containing
 * the array of invalid param.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @param {string} view
 * @constructor
 */
const ParamsValidation = async (req: Request, res: Response, next: NextFunction, view?: string) => {
  Logger.info('Validating params', {
    type: 'Middleware',
    module: 'ParamsValidation',
    service: 'ParamsValidation',
  });
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const arrayError: Array<any> = errors.array({onlyFirstError: true});
  const metaError: Array<any> = new Array<any>();
  for (const error of arrayError) {
    metaError[error.param] = {
      message: error.msg,
      old: error.value,
    };
  }
  const error = new ResponseError(422, 'Validation failed', [{errors: metaError}]);
  next(error);
};

export default ParamsValidation;
