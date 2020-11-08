import axios from 'axios';

import ArcgisDataHandler from '../DataHandlers/ArcgisDataHandler';
import CountryService from '../Services/CountryService';
import Logger from '../../utils/logger';

export default class ArcgisHelper {
  dataHandler: ArcgisDataHandler;

  countryService: CountryService;

  constructor() {
    this.dataHandler = new ArcgisDataHandler();
    this.countryService = new CountryService();
  }

  public async UpdateCountryData() {
    try {
      const response = await axios.get('https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/2/query?f=json&where=Confirmed%20%3E%200&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Confirmed%20desc&resultOffset=0&resultRecordCount=200&cacheHint=true');
      Logger.info('Calling external api', {module: 'Arcgis', service: 'UpdateCountryData'});
      if (response.data) {
        Logger.info('Response from external api', {
          module: 'Arcgis',
          service: 'UpdateCountryData',
          data: response.data,
        });
        response.data.features.forEach((element: any) => {
          const country = this.dataHandler.mapCountry(element.attributes);
          this.countryService.createOrUpdate(country);
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
}
