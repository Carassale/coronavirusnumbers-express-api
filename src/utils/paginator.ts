const DEFAULT_PER_PAGE = 10

export interface PaginatorInterface {
	page: number
	perPage: number
	recordsTotal: number | undefined
	recordsFiltered: number | undefined

	skip(): number

	limit(): number

	setRecordsTotal(n: number): void

	setRecordsFiltered(n: number): void
}

export class Paginator implements PaginatorInterface {

	page: number
	perPage: number
	recordsTotal: number | undefined
	recordsFiltered: number | undefined

	constructor(page: number = 0, perPage: number = DEFAULT_PER_PAGE) {
		this.page = page
		this.perPage = perPage
	}

	skip(): number {
		return this.page * this.perPage
	}

	limit(): number {
		return this.perPage
	}

	setRecordsTotal(n: number): void {
		this.recordsTotal = n
		if (!this.recordsFiltered) {
			this.recordsFiltered = n
		}
	}

	setRecordsFiltered(n: number): void {
		this.recordsFiltered = n
	}
}
