import { Country } from '../Models/CountryModel';

export default class ArcgisDataHandler {
  public mapCountry(element: any): Country {
    const country = {
      originalId: element.OBJECTID as number,
      name: element.Country_Region as string,
      latitude: element.Lat as number,
      longitude: element.Long_ as number,
      confirmed: element.Confirmed as number,
      recovered: element.Recovered as number,
      deaths: element.Deaths as number,
      active: element.Active as number,
    };
    return country as Country;
  }
}
