import {EventEmitter} from "events"

import UserService from "../Services/UserService"

export default (eventEmitter: EventEmitter) => {

	let userService = new UserService()

	eventEmitter.on('country_update', async ({country}) => {
		await userService.notifyByCountry(country)
	})
}
