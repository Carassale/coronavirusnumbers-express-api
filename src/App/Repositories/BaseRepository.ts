import {Document, Model} from "mongoose"

import {PaginatorInterface} from "../../utils/paginator"
import {ResponseError} from "../../utils/errors"

export default abstract class BaseRepository<T extends Document> {

	baseModel: Model<T>

	protected constructor(baseModel: Model<T>) {
		this.baseModel = baseModel
	}

	public async all(filters?: Object, projection?: Object, paginator?: PaginatorInterface, order?: Object, addFields?: Object): Promise<Array<T>> {
		let aggregate: Array<any> = []
		if (addFields) {
			aggregate.push(addFields)
		}
		if (filters) {
			aggregate.push({$match: filters})
		}
		if (projection) {
			aggregate.push({$project: projection})
		}
		if (order) {
			aggregate.push({$sort: order})
		}
		if (paginator) {
			paginator.setRecordsTotal(await this.baseModel.countDocuments().exec())
			if (filters) {
				aggregate.push({
					$group: {
						_id: null,
						count: {$sum: 1}
					}
				})
				let tmp = await this.baseModel.aggregate(aggregate).exec()
				let count = tmp.length > 0 ? tmp[0]["count"] : 0
				paginator.setRecordsFiltered(count)
				aggregate.pop()
			}
			aggregate.push({$skip: paginator.skip()})
			aggregate.push({$limit: paginator.limit()})
		}

		if (aggregate.length > 0) {
			return this.baseModel.aggregate(aggregate)
		} else {
			return await this.baseModel.find({}).exec()
		}
	}

	public async first(projection?: Object): Promise<T | null> {
		let element = await this.all({}, projection)
		return element[0]
	}

	public async firstOrFail(projection?: Object): Promise<T> {
		let element = await this.first(projection)
		if (element) {
			return element
		}
		throw new ResponseError(404, `Not found`)
	}

	public async find(id: string, projection?: Object): Promise<T | null> {
		let query = this.baseModel.findById(id)
		if (projection) {
			query = query.select(projection)
		}
		return await query.exec()
	}

	public async findOrFail(id: string, projection?: Object): Promise<T> {
		let element = await this.find(id, projection)
		if (element) {
			return element
		}
		throw new ResponseError(404, `Not found`)
	}

	public async findBy(field: string, value: any, projection?: Object): Promise<T> {
		let element = await this.findByOrNull(field, value, projection)
		if (element) {
			return element
		}
		throw new ResponseError(404, `Not found`)
	}

	public async findByOrNull(field: string, value: any, projection?: Object): Promise<T | null> {
		const queryParam: any = {}
		queryParam[field] = value
		let query = this.baseModel.findOne(queryParam)
		if (projection) {
			query = query.select(projection)
		}
		return await query.exec()
	}

	public async create(data: Object): Promise<T> {
		return await this.baseModel.create(data)
	}

	public async update(id: string, data: Object): Promise<T> {
		let element = await this.baseModel.findOneAndUpdate({
			$or: [
				{id: id},
				{_id: id}
			]
		}, data).exec()
		if (element) {
			return element
		}
		throw new ResponseError(404, `Not found`)
	}

	public async delete(id: string): Promise<boolean> {
		await this.baseModel.deleteOne({_id: id}).exec()
		return true
	}
}
