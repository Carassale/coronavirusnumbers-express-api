import BaseDataHandler from './BaseDataHandler';
import { Country } from '../Models/CountryModel';

export default class CountryDataHandler extends BaseDataHandler<Country> {

  public mapToShow(country: Country) {
    return {
      _id: country._id,
      name: country.name,
      latitude: country.latitude,
      longitude: country.longitude,
      confirmed: country.confirmed,
      recovered: country.recovered,
      deaths: country.deaths,
      active: country.active,
      updatedAt: country.updatedAt.getTime(),
      createdAt: country.createdAt.getTime(),
    };
  }
}
