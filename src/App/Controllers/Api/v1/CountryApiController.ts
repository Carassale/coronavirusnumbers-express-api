import {Request, Response} from "express"

import CountryDataHandler from "../../../DataHandlers/CountryDataHandler"
import CountryService from "../../../Services/CountryService"
import {Paginator} from "../../../../utils/paginator"
import {Country} from "../../../Models/CountryModel"

export default class CountryApiController {

	private countryService: CountryService
	private countryDataHandler: CountryDataHandler

	constructor() {
		this.countryService = new CountryService()
		this.countryDataHandler = new CountryDataHandler()
	}

	public async index(req: Request, res: Response,) {
		let page = req.query.page ? +req.query.page : 0
		let per_page = req.query.per_page ? +req.query.per_page : 200
		let order_by = req.query.order_by ? req.query.order_by : "name"
		let order_direction = req.query.order_direction ? req.query.order_direction : "asc"

		let paginator: Paginator = new Paginator(page, per_page)
		let countries = await this.countryService.all(undefined, undefined, paginator, {
			[order_by]: order_direction == "desc" ? -1 : 1
		})
		res.json({
			countries: countries.map((country: Country) => {
				return this.countryDataHandler.mapToShow(country)
			}),
			paginator: {
				page: paginator.page,
				per_page: paginator.perPage,
				total_elements: paginator.recordsTotal,
			}
		})
	}

	public async show(req: Request, res: Response,) {
		let id = req.params.id

		let country = await this.countryService.get(id)
		res.json(this.countryDataHandler.mapToShow(country))
	}
}
