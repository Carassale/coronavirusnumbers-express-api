import { NextFunction, Request, Response, Router} from 'express';
import * as bodyParser from 'body-parser';

import { ResponseError, writeError } from '../utils/errors';
import { expressLogger } from '../utils/logger';
import ApiV1Routes from './api/ApiV1Routes';

const jsonParser = bodyParser.json({limit: '50mb'});

const ApiRouter = Router({mergeParams: true});

ApiRouter.use(jsonParser);
ApiRouter.use(expressLogger);
ApiRouter.use(bodyParser.urlencoded({extended: false}));

ApiRouter.use('/', ApiV1Routes);
ApiRouter.use('/v1', ApiV1Routes);

ApiRouter.get('*', (req: Request, res: Response, next: NextFunction) => {
  const error = new ResponseError(404, 'Api Not Found');
  next(error);
});

ApiRouter.use((error: any, req: Request, res: Response, _next: NextFunction) => {
  writeError(error, res);
});

export default ApiRouter;
