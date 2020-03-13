import ArcgisHelper from '../Helpers/ArcgisHelper'

export default class UpdateCountryDataJob {

	public async handler(job: any, done: any): Promise<any> {
		const arcgisServiceInstance = new ArcgisHelper()
		await arcgisServiceInstance.UpdateCountryData()
		done()
	}
}
