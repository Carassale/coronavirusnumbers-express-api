import {Request, Response} from "express"

import UserService from "../../../Services/UserService"

export default class UserApiController {

	private countryService: UserService

	constructor() {
		this.countryService = new UserService()
	}

	public async status(req: Request, res: Response,) {
		let device_token = req.query.device_token
		let country_id = req.query.country_id

		let result = "TODO"
		res.send(result)
	}

	public async subscribe(req: Request, res: Response,) {
		let device_token = req.query.device_token
		let country_id = req.query.country_id

		let result = "TODO"
		res.send(result)
	}

	public async unsubscribe(req: Request, res: Response,) {
		let device_token = req.query.device_token
		let country_id = req.query.country_id

		let result = "TODO"
		res.send(result)
	}
}
