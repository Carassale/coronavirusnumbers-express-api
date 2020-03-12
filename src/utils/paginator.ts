const DEFAULT_PER_PAGE = 10

export interface PaginatorInterface {
	start: number
	length: number
	recordsTotal: number | undefined
	recordsFiltered: number | undefined

	skip(): number

	limit(): number

	setRecordsTotal(n: number): void

	setRecordsFiltered(n: number): void
}

export class Paginator implements PaginatorInterface {

	start: number
	length: number
	recordsTotal: number | undefined
	recordsFiltered: number | undefined

	constructor(start: number = 0, length: number = DEFAULT_PER_PAGE) {
		this.start = start
		this.length = length
	}

	skip(): number {
		return this.start
	}

	limit(): number {
		return this.length
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
