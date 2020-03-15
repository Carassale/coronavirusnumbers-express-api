import CountryDataHandler from "../DataHandlers/CountryDataHandler"
import CountryRepository from "../Repositories/CountryRepository"
import {Country} from "../Models/CountryModel"
import {eventEmitter} from "../../server"
import {logger} from "../../utils/logger"
import BaseService from "./BaseService"

export default class CountryService extends BaseService<Country> {

	// @ts-ignore
	protected repository: CountryRepository
	// @ts-ignore
	protected dataHandler: CountryDataHandler

	constructor() {
		super(new CountryRepository(), new CountryDataHandler())
	}

	public async createOrUpdate(country: Country): Promise<Country> {
		let oldCountry = await this.repository.findByOrNull('name', country.name)
		if (!oldCountry) {
			logger.info("Country not found, creating a new one", {
				module: "Country",
				service: "createOrUpdate",
				country: country
			})
			return this.repository.create(country)
		}
		if (
			oldCountry.confirmed < country.confirmed ||
			oldCountry.recovered < country.recovered ||
			oldCountry.deaths < country.deaths ||
			oldCountry.active < country.active
		) {
			logger.info("The country needs to be updated", {
				module: "Country",
				service: "createOrUpdate",
				country: country,
				oldCountry: oldCountry
			})
			let updatedCountry = await this.repository.update(oldCountry._id, country)
			eventEmitter.emit('country_update', {country: updatedCountry})
			return updatedCountry
		}
		logger.info("No change to the country", {
			module: "Country",
			service: "createOrUpdate",
			country: country
		})
		return oldCountry
	}
}
