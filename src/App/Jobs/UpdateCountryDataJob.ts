import ArcgisHelper from '../Helpers/ArcgisHelper'
import {logger} from "../../utils/logger"

export default class UpdateCountryDataJob {

	public async handler(job: any, done: any): Promise<any> {
		logger.info("UpdateCountryDataJob")
		const arcgisServiceInstance = new ArcgisHelper()
		await arcgisServiceInstance.UpdateCountryData()
		done()
	}
}
