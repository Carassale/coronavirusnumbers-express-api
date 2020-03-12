import {NextFunction, Request, Response, Router} from "express"
import * as bodyParser from "body-parser"

import {ResponseError, writeViewError} from "../utils/errors"

const WebRoutes = Router({mergeParams: true})

WebRoutes.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

WebRoutes.get('*', (req: Request, res: Response, next: NextFunction) => {
	let error = new ResponseError(404, 'Page Not Found')
	next(error)
})

WebRoutes.use((error: any, req: Request, res: Response, _next: NextFunction) => {
	writeViewError(error, res)
})

export default WebRoutes
