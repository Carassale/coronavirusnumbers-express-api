import {NextFunction, Request, Response, Router} from "express"

import CountryApiController from "../../App/Controllers/Api/v1/CountryApiController"

const CountryApiRouter = Router({mergeParams: true})
const controller = new CountryApiController()

CountryApiRouter.get(
	"/",
	(req: Request, res: Response, next: NextFunction) => controller.index(req, res).catch(next)
)

CountryApiRouter.get(
	"/:id",
	(req: Request, res: Response, next: NextFunction) => controller.show(req, res).catch(next)
)

export default CountryApiRouter
