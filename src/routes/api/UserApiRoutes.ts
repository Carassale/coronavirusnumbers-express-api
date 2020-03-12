import {NextFunction, Request, Response, Router} from "express"

import UserApiController from "../../App/Controllers/Api/v1/UserApiController"

const UserApiRouter = Router({mergeParams: true})
const controller = new UserApiController()

UserApiRouter.get(
	"/:device_token/status/:country_id",
	(req: Request, res: Response, next: NextFunction) => controller.status(req, res).catch(next)
)

UserApiRouter.post(
	"/:device_token/subscribe/:country_id",
	(req: Request, res: Response, next: NextFunction) => controller.subscribe(req, res).catch(next)
)

UserApiRouter.post(
	"/:device_token/unsubscribe/:country_id",
	(req: Request, res: Response, next: NextFunction) => controller.unsubscribe(req, res).catch(next)
)

export default UserApiRouter
