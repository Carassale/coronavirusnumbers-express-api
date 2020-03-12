import {Country, CountryModel} from "../Models/CountryModel"
import BaseRepository from "./BaseRepository"

export default class CountryRepository extends BaseRepository<Country> {

	constructor() {
		super(CountryModel)
	}
}
