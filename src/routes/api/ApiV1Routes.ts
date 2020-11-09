import { Router } from 'express';

import CountryApiRouter from './v1/CountryApiRoutes';

const ApiV1Router = Router({mergeParams: true});

ApiV1Router.use('/v1/country', CountryApiRouter);

export default ApiV1Router;
