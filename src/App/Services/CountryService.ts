import CountryDataHandler from "../DataHandlers/CountryDataHandler"
import CountryRepository from "../Repositories/CountryRepository"
import {Country} from "../Models/CountryModel"
import {eventEmitter} from "../../server"
import BaseService from "./BaseService"

export default class CountryService extends BaseService<Country> {

	// @ts-ignore
	repository: CountryRepository
	// @ts-ignore
	dataHandler: CountryDataHandler

	constructor() {
		super(new CountryRepository(), new CountryDataHandler())
	}

	public async createOrUpdate(country: Country): Promise<Country> {
		let oldCountry = await this.repository.findByOrNull('originalId', country.originalId)
		if (!oldCountry) {
			return this.repository.create(country)
		}
		if (oldCountry.updatedAt < country.updatedAt) {
			let updatedCountry = await this.repository.update(oldCountry.id, country)
			eventEmitter.emit('country_update', {country: updatedCountry})
			return updatedCountry
		}
		return oldCountry
	}
}
