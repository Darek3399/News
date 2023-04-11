import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
	providedIn: 'root'
})


export class SourcesService {
	constructor(private http: HttpClient) {
	}
	getSources(): Observable<any> {


		return this.http.get<any>('https://newsapi.org/v2/top-headlines/sources', {
			params: new HttpParams({
				fromObject: {
					// country: 'us',
					apiKey: '4a6d38726e90482e9bbee12ccd42b150',
					// pageSize: 100
				}
			})
		})
	}
}