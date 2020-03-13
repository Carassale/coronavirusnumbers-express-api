import {NextFunction, Request, Response, Router} from "express"
import {query} from "express-validator"

import CountryApiController from "../../App/Controllers/Api/v1/CountryApiController"
import ParamsValidation from "../../App/Middleware/ParamsValidation"

const CountryApiRouter = Router({mergeParams: true})
const controller = new CountryApiController()

CountryApiRouter.get(
	"/",
	[
		query("page").optional().isNumeric(),
		query("per_page").optional().isNumeric(),
		query("order_by").optional().isString().isIn([
			"name", "confirmed", "recovered", "deaths", "updatedAt"
		]),
		query("order_direction").optional().isString().isIn([
			"asc", "desc"
		])
	],
	(req: Request, res: Response, next: NextFunction) => ParamsValidation(req, res, next, 'auth/reset-ask'),
	(req: Request, res: Response, next: NextFunction) => controller.index(req, res).catch(next)
)

CountryApiRouter.get(
	"/:id",
	(req: Request, res: Response, next: NextFunction) => controller.show(req, res).catch(next)
)

export default CountryApiRouter
