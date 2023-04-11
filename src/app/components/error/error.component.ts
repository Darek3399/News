import { Component, DoCheck } from "@angular/core";
import { ErrorService } from "src/app/services/error.service";

@Component({
	selector: `app-error`,
	templateUrl: `./error.component.html`,
	styleUrls: [`./error.component.scss`]
})


export class ErrorComponent implements DoCheck {

	constructor(
		public errorService: ErrorService	
	) {}


		ngDoCheck(): void {
			
		}

}