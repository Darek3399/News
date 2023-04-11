import { Component, DoCheck, KeyValueDiffers, OnInit } from "@angular/core";
import { PaginationService } from "src/app/services/pagination.service";
import { HeadlinesComponent } from "../headlines/headlines.component";

@Component({
	selector: `app-pagination`,
	templateUrl: `./pagination.component.html`,
	styleUrls: [`./pagination.component.scss`]
})


export class PaginationComponent implements OnInit, DoCheck {

	numberOfPagesForPagination: Array<number>
	differ

	constructor(
		private paginationService: PaginationService,
		private differs: KeyValueDiffers,
	) {
		this.differ = this.differs.find({}).create()
	}

	
	ngOnInit(): void {
	}

	ngDoCheck(): void {
		const changes = this.differ.diff({ name : this.paginationService.setPaginationAmount()})
		if(changes) {
			if(this.paginationService.setPaginationAmount() !== undefined && this.paginationService.setPaginationAmount().length !== 0) {
				this.numberOfPagesForPagination = this.paginationService.setPaginationAmount()
			}
		}
	}
}