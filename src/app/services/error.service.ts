import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
	providedIn: 'root'
})


export class ErrorService {

	error: string

	handle(message: string) {
		this.error = message
	}

	clear() {
		this.error = ''
	}
}