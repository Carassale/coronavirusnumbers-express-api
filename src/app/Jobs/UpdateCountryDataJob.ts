import ArcgisHelper from '../Helpers/ArcgisHelper';
import Logger from '../../utils/logger';

export default class UpdateCountryDataJob {

  public async handler(job: any, done: any): Promise<any> {
    Logger.info('UpdateCountryDataJob');
    const arcgisServiceInstance = new ArcgisHelper();
    await arcgisServiceInstance.UpdateCountryData();
    done();
  }
}
