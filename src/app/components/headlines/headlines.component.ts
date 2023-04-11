import { ChangeDetectorRef, Component, DoCheck, EventEmitter, KeyValueDiffers, OnInit, Output } from "@angular/core";
import { INewsResponse } from "src/app/models/modelNews";
import { ArticlesService } from "src/app/services/articles.service";
import { PaginationService } from "src/app/services/pagination.service";
// import { NewsComponent } from "./news/news.component";


@Component({
	selector: `app-headlines`,
	templateUrl: `./headlines.component.html`,
	styleUrls: [`./headlines.component.scss`]
})


export class HeadlinesComponent implements OnInit, DoCheck {

	// responce from server
	news: INewsResponse[]

	@Output() setIsoCodeForSubmit: any = new EventEmitter()
	loading: boolean
	differ


	// ISO codes countrys
	ISOCodes: any[] = [
		'ae',
		'ar',
		'at',
		'au',
		'be',
		'bg',
		'br',
		'ca',
		'ch',
		'cn',
		'co',
		'cu',
		'cz',
		'de',
		'eg',
		'fr',
		'gb',
		'gr',
		'hk',
		'hu',
		'id',
		'ie',
		'il',
		'in',
		'it',
		'jp',
		'kr',
		'lt',
		'lv',
		'ma',
		'mx',
		'my',
		'ng',
		'nl',
		'no',
		'nz',
		'ph',
		'pl',
		'pt',
		'ro',
		'rs',
		'ru',
		'sa',
		'se',
		'sg',
		'si',
		'sk',
		'th',
		'tr',
		'tw',
		'ua',
		'us',
		've',
		'za'
	]

	countrysAndISOCodes: { country: string, isoCode: string }[] = []

	// alphabet sort
	countrys: any[] = []


	categories: any[] = [
		'business',
		'entertainment',
		'general',
		'health',
		'science',
		'sports',
		'technology'
	]


	// current country and category
	currentCountry: string = 'Country'
	currentCategory: string = 'Category'

	isoCodeForSubmit: any

	// selects toggle
	isCountrysOpened: boolean = false
	isCategoriesOpened: boolean = false




	countrySelectOpened(): void {
		this.isCountrysOpened = !this.isCountrysOpened
		document.querySelector(`.headlines__select-country`)?.classList.remove(`selects-validation-error`)
	}
	categoriesSelectOpened(): void {
		this.isCategoriesOpened = !this.isCategoriesOpened
		document.querySelector(`.headlines__select-categories`)?.classList.remove(`selects-validation-error`)
	}




	countryClickedOutside(): void {
		this.isCountrysOpened = false
	}
	categoryClickedOutside(): void {
		this.isCategoriesOpened = false
	}





	selectCountry(event: any): void {
		this.currentCountry = event.target.innerText
	}
	selectCategory(event: any): void {
		this.currentCategory = event.target.innerHTML
	}





	numberOfPagesForPagination: Array<number> = []
	// ===============================

	constructor(
		private articlesService: ArticlesService,
		private paginationService: PaginationService,
		private differs: KeyValueDiffers,
		private changeDetection: ChangeDetectorRef
	) {

		this.differ = this.differs.find({}).create()




		for (let i = 0; i < this.ISOCodes.length; i++) {
			this.countrysAndISOCodes[i] = {
				'country': JSON.stringify(new Intl.DisplayNames([], { type: 'region' }).of(this.ISOCodes[i].toUpperCase())),
				'isoCode': this.ISOCodes[i]
			}
		}


		for (let i = 0; i < this.countrysAndISOCodes.length; i++) {
			this.countrys.push(JSON.parse(this.countrysAndISOCodes[i].country))
		}

		this.countrys.sort((a: any, b: any) => a.localeCompare(b, 'en', { 'sensitivity': 'base' }))
	}




	ngOnInit(): void {

		this.loading = true

		this.articlesService.getArticlesTopNewsOnLoad().subscribe((response) => {
			this.news = response.articles
			for (let i: number = 0; i < Math.ceil(response.totalResults / response.articles.length); i++) {
				this.numberOfPagesForPagination.push(i + 1)
			}
			this.loading = false
		})
	}

	ngDoCheck(): void {
		const changes = this.differ.diff({ name: this.numberOfPagesForPagination, name2: this.loading })
		if (changes) {
			if (this.numberOfPagesForPagination.length !== 0)
				this.paginationService.getPaginationAmount(this.numberOfPagesForPagination, this.loading)
		}
	}

	switchingPaginButtonActiveClass(pageNumber: number): void {
		let paginButtons = document.querySelectorAll('.pagination__button')

		for (let i = 0; i < paginButtons.length; i++) {
			paginButtons[i].classList.remove(`pagination__active`)
		}
		paginButtons[pageNumber - 1].classList.add(`pagination__active`)
	}
	

	currentPage(event: any): void {
		// this.loading = true
		const pageNumber = event.target.value
		this.articlesService.getArticlesOnSubmit(this.isoCodeForSubmit, this.currentCategory, pageNumber).subscribe((response) => {
			this.news = response.articles
			this.switchingPaginButtonActiveClass(pageNumber)
			this.changeDetection.detectChanges()
		})
		// this.loading = false
	}


	pageNumber: number
	currentPageFromNextArrow(): void {
		let paginButtons = document.querySelectorAll('.pagination__button')

		for (let i = 0; i < paginButtons.length; i++) {
			if(paginButtons[i].className == 'pagination__button pagination__active') {
				if ( i < paginButtons.length - 1) {
					this.pageNumber = i + 2
				}else {
					this.pageNumber = paginButtons.length
				}
			}
		}
		this.articlesService.getArticlesOnSubmit(this.isoCodeForSubmit, this.currentCategory, this.pageNumber).subscribe((response) => {
			this.news = response.articles
			this.switchingPaginButtonActiveClass(this.pageNumber)
			this.changeDetection.detectChanges()
		})
	}
	currentPageFromPrevArrow(): void {
		let paginButtons = document.querySelectorAll('.pagination__button')

		for (let i = 0; i < paginButtons.length; i++) {
			if(paginButtons[i].className == 'pagination__button pagination__active') {
				if ( i > 0 ) {
					this.pageNumber = i
				}else {
					this.pageNumber = 1
				}
			}
		}
		this.articlesService.getArticlesOnSubmit(this.isoCodeForSubmit, this.currentCategory, this.pageNumber).subscribe((response) => {
			this.news = response.articles
			this.switchingPaginButtonActiveClass(this.pageNumber)
			this.changeDetection.detectChanges()
		})
	}


	submit(): void {


		let countryValidation: any = () => this.currentCountry !== 'Country'
		let categoryValidation: any = () => this.currentCategory !== 'Category'

		const selectCountry = document.querySelector(`.headlines__select-country`)
		const selectCategory = document.querySelector(`.headlines__select-categories`)
		if (!countryValidation()) {
			selectCountry?.classList.add('selects-validation-error')
		}
		if (!categoryValidation()) {
			selectCategory?.classList.add('selects-validation-error')
		}




		this.isoCodeForSubmit = (() => {
			for (let i = 0; i < this.countrysAndISOCodes.length; i++) {

				if (JSON.parse(this.countrysAndISOCodes[i].country) == this.currentCountry) {
					return this.countrysAndISOCodes[i].isoCode
				}
			}
		})()
		this.setIsoCodeForSubmit.emit(this.isoCodeForSubmit)


		if (categoryValidation() && countryValidation()) {
			this.articlesService.getArticlesOnSubmit(this.isoCodeForSubmit, this.currentCategory, 1).subscribe(response => {
				this.news = response.articles
				this.changeDetection.detectChanges()
			})
		}
		
	}
}