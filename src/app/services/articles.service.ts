import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { ErrorService } from "./error.service";

@Injectable({
	providedIn: 'root'
})


export class ArticlesService {


	constructor(
		private http: HttpClient,
		private errorService: ErrorService
	) {
	}
	countryForGet: string = window.navigator.language
	categoryForGet: string = 'General'
	pageNumber: number = 1



	// top-headlines
	getArticlesTopNewsOnLoad(): Observable<any> {
		return this.http.get<any>('https://newsapi.org/v2/top-headlines', {
			params: new HttpParams({
				fromObject: {
					country: this.countryForGet,
					// apiKey: 'fcf58d20d275476780c04730cfb3482e',
					// apiKey: '60687f5bfcf345a1b4203083d508b986',
					// apiKey: '96212d223d494adea8276e0636e02bdd', ////////
					// apiKey: '4a6d38726e90482e9bbee12ccd42b150',
					apiKey: 'e03ef083d3254143a6060098e7f81f52',
					pageSize: 5,
				}
			})
		})
	}




	getArticlesOnSubmit(isoCodeForSubmit: string, currentCategory: string, pageNumber: number): Observable<any> {
		if(isoCodeForSubmit) {
			this.countryForGet = isoCodeForSubmit
		}
		if(currentCategory !== 'Category') {
			this.categoryForGet = currentCategory
		}

		return this.http.get<any>('https://newsapi.org/v2/top-headlines', {
			params: new HttpParams({
				fromObject: {
					country: this.countryForGet,
					// apiKey: 'fcf58d20d275476780c04730cfb3482e',
					// apiKey: '60687f5bfcf345a1b4203083d508b986',
					// apiKey: '96212d223d494adea8276e0636e02bdd', ///////
					// apiKey: '4a6d38726e90482e9bbee12ccd42b150',
					apiKey: 'e03ef083d3254143a6060098e7f81f52',
					category: this.categoryForGet,
					pageSize: 5,
					page: pageNumber
				}
			})
		})
	}










	







	// everythingt

	q: string = 'global'
	initialCurrentSearchingInCategory: Array<string> = ['title']
	initialLanguageForSubmit: any = window.navigator.language
	initialCurrentSortBy: string = 'publishedAt'
	initialPageNumber: number = 1





	getArticlesEverythingOnLoad(currentSearchingInCategory: Array<string>, languageForSubmit: any, currentSortBy: string, pageNumber: number): Observable<any> {
		if (languageForSubmit) {
			this.initialLanguageForSubmit = languageForSubmit
		}
		if (currentSortBy) {
			this.initialCurrentSortBy = currentSortBy
		}
		if (pageNumber) {
			this.initialPageNumber = pageNumber
		}
		if (currentSearchingInCategory) {
			this.initialCurrentSearchingInCategory = currentSearchingInCategory
		}



		return this.http.get<any>('https://newsapi.org/v2/everything', {
			params: new HttpParams({
				fromObject: {
					// apiKey: 'fcf58d20d275476780c04730cfb3482e',
					// apiKey: '4a6d38726e90482e9bbee12ccd42b150',
					// apiKey: '60687f5bfcf345a1b4203083d508b986',
					// apiKey: '96212d223d494adea8276e0636e02bdd',
					apiKey: 'e03ef083d3254143a6060098e7f81f52',
					pageSize: 5,
					q: `global`,
					language: this.initialLanguageForSubmit
				}
			})
		})
	}


	getArticlesEverythingSubnmit(currentSearchingInCategory: Array<string>, languageForSubmit: any, currentSortBy: string, pageNumber: number, q: string | undefined): Observable<any> {
		if (languageForSubmit) {
			this.initialLanguageForSubmit = languageForSubmit
		}
		if (currentSortBy) {
			if(currentSortBy == 'published') {
				this.initialCurrentSortBy = 'publishedAt'
			}else {
				this.initialCurrentSortBy = currentSortBy
			}
		}
		if (pageNumber) {
			this.initialPageNumber = pageNumber
		}
		if (currentSearchingInCategory) {
			this.initialCurrentSearchingInCategory = currentSearchingInCategory
		}
		if (q) {
			this.q = q
		}





		return this.http.get<any>('https://newsapi.org/v2/everything', {
			params: new HttpParams({
				fromObject: {
					// apiKey: 'fcf58d20d275476780c04730cfb3482e',
					// apiKey: '4a6d38726e90482e9bbee12ccd42b150',
					// apiKey: '60687f5bfcf345a1b4203083d508b986',
					// apiKey: '96212d223d494adea8276e0636e02bdd',
					apiKey: 'e03ef083d3254143a6060098e7f81f52',
					pageSize: 5,
					page: pageNumber,
					q: JSON.stringify(this.q),
					language: this.initialLanguageForSubmit,
					searchIn: this.initialCurrentSearchingInCategory.join(),
					sortBy: this.initialCurrentSortBy
				}
			})
		}).pipe(
				catchError(this.errorHandler.bind(this))
			)
	}
	private errorHandler(error: HttpErrorResponse) {
		this.errorService.handle(error.error.message)
		return throwError( () => error.error.message)
	}
	
}