import {Request, Response} from "express"

import CountryService from "../../../Services/CountryService"

export default class CountryApiController {

	private countryService: CountryService

	constructor() {
		this.countryService = new CountryService()
	}

	public async index(req: Request, res: Response,) {
		let result = await this.countryService.all()
		res.send(result)
	}

	public async show(req: Request, res: Response,) {
		let id = req.query.id

		let result = await this.countryService.get(id)
		res.send(result)
	}
}
