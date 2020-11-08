import PushNotificationHelper from '../Helpers/PushNotificationHelper';
import UserDataHandler from '../DataHandlers/UserDataHandler';
import UserRepository from '../Repositories/UserRepository';
import { Country } from '../Models/CountryModel';
import { User } from '../Models/UserModel';
import BaseService from './BaseService';

export default class UserService extends BaseService<User> {
  // @ts-ignore
  protected repository: UserRepository;

  // @ts-ignore
  protected dataHandler: UserDataHandler;

  private pushNotificationHelper: PushNotificationHelper;

  constructor() {
    super(new UserRepository(), new UserDataHandler());
    this.pushNotificationHelper = new PushNotificationHelper();
  }

  public async notifyByCountry(country: Country) {
    const title = `Upgrade in the country ${country.name}`;
    const body = 'Some value has increased!';

    const users = await this.repository.all({
      subscribedCountries: country._id,
    });
    users.forEach((user) => {
      this.pushNotificationHelper.pushNotification(user, title, body);
    });
  }

  public async firstOrNew(deviceToken: string): Promise<User> {
    let user = await this.repository.findByOrNull('deviceToken', deviceToken);
    if (!user) {
      user = await this.create(deviceToken);
    }
    return user;
  }

  public async addCountry(user: User, countryId: string) {
    if (user.subscribedCountries.indexOf(countryId) < 0) {
      const countries = user.subscribedCountries;
      countries.push(countryId);
      await this.repository.update(user._id, {
        subscribedCountries: countries,
      });
    }
  }

  public async removeCountry(user: User, countryId: string) {
    if (user.subscribedCountries.indexOf(countryId) >= 0) {
      const countries = user.subscribedCountries.filter((country) => country != countryId);
      await this.repository.update(user._id, {
        subscribedCountries: countries,
      });
    }
  }

  public async create(deviceToken: string): Promise<User> {
    const endpoint = await this.pushNotificationHelper.addDeviceToken(deviceToken);
    return this.repository.create({
      deviceToken,
      endpoint,
    });
  }
}
