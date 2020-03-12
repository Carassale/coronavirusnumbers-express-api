import {Document} from "mongoose"

export default abstract class BaseDataHandler<T extends Document> {

	protected constructor() {
	}
}
