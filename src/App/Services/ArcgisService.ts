import axios from "axios"

import ArcgisDataHandler from "../DataHandlers/ArcgisDataHandler"
import CountryService from "./CountryService"

export default class ArcgisService {

	baseUrl = "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/2/query"

	dataHandler: ArcgisDataHandler
	countryService: CountryService

	constructor() {
		this.dataHandler = new ArcgisDataHandler()
		this.countryService = new CountryService()
	}

	public async UpdateCountryData() {
		try {
			const response = await axios.get(this.baseUrl, {
				params: {
					f: "json",
					where: "Confirmed%20%3E%200",
					returnGeometry: "false",
					spatialRel: "esriSpatialRelIntersects",
					outFields: "*",
					orderByFields: "Country_Region asc",
					resultOffset: 0,
					resultRecordCount: 200,
					cacheHint: "true"
				}
			})
			if (response.data) {
				response.data.features.forEach((element: any) => {
					let country = this.dataHandler.mapCountry(element.attributes)
					this.countryService.createOrUpdate(country)
				})
			}
		} catch (e) {
			console.log(e)
		}
	}
}
