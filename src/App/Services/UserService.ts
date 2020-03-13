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

	constructor() {
		super(new UserRepository(), new UserDataHandler())
	}
}
