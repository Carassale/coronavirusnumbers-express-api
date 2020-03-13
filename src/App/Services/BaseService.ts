import {Document} from "mongoose"

import BaseDataHandler from "../DataHandlers/BaseDataHandler"
import BaseRepository from "../Repositories/BaseRepository"
import {PaginatorInterface} from "../../utils/paginator"

export default abstract class BaseService<T extends Document> {

	protected repository: BaseRepository<T>
	protected dataHandler: BaseDataHandler<T>

	protected constructor(repository: BaseRepository<T>, dataHandler: BaseDataHandler<T>) {
		this.repository = repository
		this.dataHandler = dataHandler
	}

	public async all(filters?: Object, projection?: Object, paginator?: PaginatorInterface, order?: Object): Promise<Array<T>> {
		return this.repository.all(filters, projection, paginator, order)
	}

	public async get(id: string, projection?: Object): Promise<T> {
		return this.repository.findOrFail(id, projection)
	}

	public async getByField(field: string, value: any, projection?: Object): Promise<T> {
		return this.repository.findBy(field, value, projection)
	}
}
