import {NextFunction, Request, Response, Router} from "express"
import * as bodyParser from "body-parser"

import {ResponseError, writeError} from "../utils/errors"
import CountryApiRouter from "./api/CountryApiRoutes"
import UserApiRouter from "./api/UserApiRoutes"
import {expressLogger} from "../utils/logger"

const jsonParser = bodyParser.json({limit: '50mb'})

const ApiRouter = Router({mergeParams: true})

ApiRouter.use(jsonParser)
ApiRouter.use(expressLogger)
ApiRouter.use(bodyParser.urlencoded({extended: false}))

ApiRouter.use('/user', UserApiRouter)
ApiRouter.use('/country', CountryApiRouter)

ApiRouter.get('*', (req: Request, res: Response, next: NextFunction) => {
	let error = new ResponseError(404, 'Api Not Found')
	next(error)
})

ApiRouter.use((error: any, req: Request, res: Response, _next: NextFunction) => {
	writeError(error, res)
})

export default ApiRouter
