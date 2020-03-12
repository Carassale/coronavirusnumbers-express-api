import {Document} from "mongoose"

import BaseRepository from "../Repositories/BaseRepository"
import BaseDataHandler from "../DataHandlers/BaseDataHandler"

export default abstract class BaseService<T extends Document> {

	protected repository: BaseRepository<T>
	protected dataHandler: BaseDataHandler

	protected constructor() {
	}

	public async all(): Promise<Array<T>> {
		return this.repository.all()
	}

	public async get(id: string): Promise<T> {
		return this.repository.findOrFail(id)
	}
}
