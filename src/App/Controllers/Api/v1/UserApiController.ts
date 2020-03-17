import {Request, Response} from "express"

import UserService from "../../../Services/UserService"

export default class UserApiController {

	private userService: UserService

	constructor() {
		this.userService = new UserService()
	}

	public async status(req: Request, res: Response,) {
		let deviceToken = req.params.device_token
		let country_id = req.params.country_id

		let user = await this.userService.getByField('deviceToken', deviceToken)
		let active = user.subscribedCountries.indexOf(country_id) >= 0
		res.json({active: active})

	}

	public async subscribe(req: Request, res: Response,) {
		let deviceToken = req.params.device_token
		let country_id = req.params.country_id

		let user = await this.userService.firstOrNew(deviceToken)
		await this.userService.addCountry(user, country_id)
		res.send(true)
	}

	public async unsubscribe(req: Request, res: Response,) {
		let deviceToken = req.params.device_token
		let country_id = req.params.country_id

		let user = await this.userService.getByField('deviceToken', deviceToken)
		await this.userService.removeCountry(user, country_id)
		res.send(true)
	}
}
