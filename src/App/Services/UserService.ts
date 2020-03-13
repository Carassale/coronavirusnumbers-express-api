import PushNotificationHelper from "../Helpers/PushNotificationHelper"
import UserDataHandler from "../DataHandlers/UserDataHandler"
import UserRepository from "../Repositories/UserRepository"
import {Country} from "../Models/CountryModel"
import {User} from "../Models/UserModel"
import BaseService from "./BaseService"

export default class UserService extends BaseService<User> {

	// @ts-ignore
	repository: UserRepository
	// @ts-ignore
	dataHandler: UserDataHandler

	pushNotificationHelper: PushNotificationHelper

	constructor() {
		super(new UserRepository(), new UserDataHandler())
		this.pushNotificationHelper = new PushNotificationHelper()
	}

	public async notifyByCountry(country: Country) {
		let title = `Upgrade in the country ${country.name}`
		let body = "Some value has increased!"

		let users = await this.repository.all({
			subscribedCountries: country.id
		})
		users.forEach(user => {
			this.pushNotificationHelper.pushNotification(user, title, body)
		})
	}
}
