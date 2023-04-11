import { Injectable } from "@angular/core";


@Injectable({
	providedIn: 'root'
})


export class PaginationService {


	constructor(
	) {
	}

	numberOfPagesForPagination: any

	// top-headlines
	getPaginationAmount(numberOfPagesForPagination: Array<number>, loading: boolean): void {
		this.numberOfPagesForPagination = numberOfPagesForPagination
	}
	setPaginationAmount() {
		return this.numberOfPagesForPagination
	}
}