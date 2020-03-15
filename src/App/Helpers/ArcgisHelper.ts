import axios from "axios"

import ArcgisDataHandler from "../DataHandlers/ArcgisDataHandler"
import CountryService from "../Services/CountryService"
import {logger} from "../../utils/logger"

export default class ArcgisHelper {

	baseUrl = "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/2/query"
	completeUrl = "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/2/query?f=json&where=Confirmed%20%3E%200&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Confirmed%20desc&resultOffset=0&resultRecordCount=200&cacheHint=true"

	dataHandler: ArcgisDataHandler
	countryService: CountryService

	constructor() {
		this.dataHandler = new ArcgisDataHandler()
		this.countryService = new CountryService()
	}

	public async UpdateCountryData() {
		try {
			const response = await axios.get(this.completeUrl)
			// const response = await axios.get(this.baseUrl, {
			// 	params: {
			// 		f: "json",
			// 		where: "Confirmed%20%3E%200",
			// 		returnGeometry: "false",
			// 		spatialRel: "esriSpatialRelIntersects",
			// 		outFields: "*",
			// 		orderByFields: "Country_Region asc",
			// 		resultOffset: 0,
			// 		resultRecordCount: 200,
			// 		cacheHint: "true"
			// 	}
			// })
			logger.info("Calling external api", {module: "Arcgis", service: "UpdateCountryData"})
			if (response.data) {
				logger.info("Response from external api", {
					module: "Arcgis",
					service: "UpdateCountryData",
					data: response.data
				})
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
