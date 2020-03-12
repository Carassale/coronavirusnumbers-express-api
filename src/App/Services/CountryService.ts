import CountryDataHandler from "../DataHandlers/CountryDataHandler"
import CountryRepository from "../Repositories/CountryRepository"
import {Country} from "../Models/CountryModel"
import BaseService from "./BaseService"

export default class CountryService extends BaseService<Country> {

	// @ts-ignore
	repository: CountryRepository
	// @ts-ignore
	dataHandler: CountryDataHandler

	constructor() {
		super(new CountryRepository(), new CountryDataHandler())
	}
}
