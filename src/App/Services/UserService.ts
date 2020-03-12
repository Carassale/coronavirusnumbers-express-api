import UserDataHandler from "../DataHandlers/UserDataHandler"
import UserRepository from "../Repositories/UserRepository"
import {User} from "../Models/UserModel"
import BaseService from "./BaseService"

export default class UserService extends BaseService<User> {

	repository: UserRepository
	dataHandler: UserDataHandler

	constructor() {
		super()
		this.repository = new UserRepository()
		this.dataHandler = new UserDataHandler()
	}
}
