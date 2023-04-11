import { Injectable } from "@angular/core";
import { Subject } from "rxjs";


@Injectable({
	providedIn: `root`
})

export class SelectsService {
	select = new Subject()

	handle(message: string) {
		
	}
}