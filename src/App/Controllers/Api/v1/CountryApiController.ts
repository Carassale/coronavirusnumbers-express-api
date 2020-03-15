import {Request, Response} from "express"

import CountryService from "../../../Services/CountryService"
import {Paginator} from "../../../../utils/paginator"

export default class CountryApiController {

	private countryService: CountryService

	constructor() {
		this.countryService = new CountryService()
	}

	public async index(req: Request, res: Response,) {
		let page = req.query.page ? +req.query.page : 0
		let per_page = req.query.per_page ? +req.query.per_page : 200
		let order_by = req.query.order_by ? req.query.order_by : "name"
		let order_direction = req.query.order_direction ? req.query.order_direction : "asc"

		let paginator: Paginator = new Paginator(page, per_page)
		let countries = await this.countryService.all({}, {
			_id: 1,
			name: 1,
			latitude: 1,
			longitude: 1,
			confirmed: 1,
			recovered: 1,
			deaths: 1,
			active: 1,
			updatedAt: 1
		}, paginator, {
			[order_by]: order_direction == "desc" ? -1 : 1
		})
		res.send({
			countries: countries.map((c: any) => {
				c.updatedAt = c.updatedAt.getTime()
				return c
			}),
			paginator: {
				page: paginator.page,
				per_page: paginator.perPage,
				total_elements: paginator.recordsTotal,
			}
		})
	}

	public async show(req: Request, res: Response,) {
		let id = req.query.id

		let result = await this.countryService.get(id)
		res.send(result)
	}
}
