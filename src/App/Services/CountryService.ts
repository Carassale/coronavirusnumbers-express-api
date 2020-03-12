import CountryDataHandler from "../DataHandlers/CountryDataHandler"
import CountryRepository from "../Repositories/CountryRepository"
import {Country} from "../Models/CountryModel"
import BaseService from "./BaseService"

export default class CountryService extends BaseService<Country> {

	repository: CountryRepository
	dataHandler: CountryDataHandler

	constructor() {
		super()
		this.repository = new CountryRepository()
		this.dataHandler = new CountryDataHandler()
	}
}
