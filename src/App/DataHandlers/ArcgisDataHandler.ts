import {Country} from "../Models/CountryModel"

export default class ArcgisDataHandler {

	constructor() {
	}

	public mapCountry(element: any): Country {
		let country = {
			originalId: element.OBJECTID as number,
			name: element.Country_Region as string,
			latitude: element.Lat as number,
			longitude: element.Long_ as number,
			confirmed: element.Confirmed as number,
			recovered: element.Deaths as number,
			deaths: element.Recovered as number,
		}
		return country as Country
	}
}
