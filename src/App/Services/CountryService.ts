import CountryDataHandler from '../DataHandlers/CountryDataHandler';
import CountryRepository from '../Repositories/CountryRepository';
import { Country } from '../Models/CountryModel';
import { eventEmitter } from '../../server';
import BaseService from './BaseService';
import Logger from '../../utils/logger';

export default class CountryService extends BaseService<Country> {
  // @ts-ignore
  protected repository: CountryRepository;

  // @ts-ignore
  protected dataHandler: CountryDataHandler;

  constructor() {
    super(new CountryRepository(), new CountryDataHandler());
  }

  public async createOrUpdate(country: Country): Promise<Country> {
    const oldCountry = await this.repository.findByOrNull('name', country.name);
    if (!oldCountry) {
      Logger.info('Country not found, creating a new one', {
        module: 'Country',
        service: 'createOrUpdate',
        country,
      });
      return this.repository.create(country);
    }
    if (
      oldCountry.confirmed < country.confirmed
      || oldCountry.recovered < country.recovered
      || oldCountry.deaths < country.deaths
      || oldCountry.active < country.active
    ) {
      Logger.info('The country needs to be updated', {
        module: 'Country',
        service: 'createOrUpdate',
        country,
        oldCountry,
      });
      const updatedCountry = await this.repository.update(oldCountry._id, country);
      eventEmitter.emit('country_update', {country: updatedCountry});
      return updatedCountry;
    }
    Logger.info('No change to the country', {
      module: 'Country',
      service: 'createOrUpdate',
      country,
    });
    return oldCountry;
  }
}
