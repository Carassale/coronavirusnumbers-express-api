import BaseDataHandler from "./BaseDataHandler"
import {User} from "../Models/UserModel"

export default class UserDataHandler extends BaseDataHandler<User> {

	constructor() {
		super()
	}
}
