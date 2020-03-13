import ArcgisService from '../Services/ArcgisService'

export default class UpdateCountryDataJob {

	public async handler(job: any, done: any): Promise<any> {
		const arcgisServiceInstance = new ArcgisService()
		await arcgisServiceInstance.UpdateCountryData()
		done()
	}
}
