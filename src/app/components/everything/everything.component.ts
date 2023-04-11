import { ChangeDetectorRef, Component, DoCheck, KeyValueDiffers, OnInit } from "@angular/core";
import { catchError } from "rxjs";
import { INewsResponse } from "src/app/models/modelNews";
import { ArticlesService } from "src/app/services/articles.service";

@Component({
	selector: `app-everythingt`,
	templateUrl: `./everything.component.html`,
	styleUrls: [`./everything.component.scss`]
})


export class EverythingComponent implements OnInit, DoCheck {

	news: INewsResponse[]
	numberOfPagesForPagination: Array<number> = []
	differ
	arrowForSelect = new URL('./assets/img/arrow_for_select.png', import.meta.url)


	searchingIn: Array<string> = [
		'title',
		'description',
		'content'
	]


	ISOCodes: any[] = [
		'ar',
		'de',
		'en',
		'es',
		'fr',
		'he',
		'it',
		'nl',
		'no',
		'pt',
		'ru',
		'sv',
		'zh'
	]
	languagesAndISOCodes: { language: string, isoCode: string }[] = []
	languages: string[] = []
	languageForSubmit = () => {
		for (let i = 0; i < this.languagesAndISOCodes.length; i++) {

			if (this.languagesAndISOCodes[i].language.toLowerCase() === JSON.stringify(this.currentLanguage.toLowerCase())) {
				return this.languagesAndISOCodes[i].isoCode
			}
		}
	}
	q: string


	sortingList: Array<string> = [
		'relevancy',
		'published',
		'popularity'
	]





	currentSearchingInCategory: Array<string> = ['title', 'description', 'content']
	currentLanguage: any = new Intl.DisplayNames(['en'], { type: 'language' }).of(window.navigator.language.toUpperCase())
	currentSortBy: string = 'relevancy'

	


	isSearchingInCategoryOpened: boolean = false
	isLanguageOpened: boolean = false
	isSortingOpened: boolean = false



	// ...
	ngDoCheck(): void {
		const checkboxList = document.querySelectorAll('.searching-in__item-checkbox')
		const changes = this.differ.diff({ name: checkboxList })
		if(changes) {
			for (let i = 0; i < checkboxList.length; i++) {
				const checkboxElement = (checkboxList[i] as HTMLInputElement)
				for (let y = 0; y < this.currentSearchingInCategory.length; y++) {
					if (checkboxElement.value.toLowerCase() === this.currentSearchingInCategory[y]) {
						checkboxElement.checked = true
					}
				}
			}
		}
	}

	





	searchingInSelectOpened(): void {
		this.isSearchingInCategoryOpened = !this.isSearchingInCategoryOpened
		if (this.isSearchingInCategoryOpened) {
			document.querySelector('.searching-in-arrow')?.setAttribute('style', 'transform: scaleY(-1); top: 30%;')
		}else {
			document.querySelector('.searching-in-arrow')?.removeAttribute('style')
		}
	}
	languageSelectOpened(): void {
		this.isLanguageOpened = !this.isLanguageOpened
		if (this.isLanguageOpened) {
			document.querySelector('.languages-arrow')?.setAttribute('style', 'transform: scaleY(-1); top: 30%;')
		}else {
			document.querySelector('.languages-arrow')?.removeAttribute('style')
		}
	}
	sortingSelectOpened(): void {
		this.isSortingOpened = !this.isSortingOpened
		if (this.isSortingOpened) {
			document.querySelector('.sort-arrow')?.setAttribute('style', 'transform: scaleY(-1); top: 30%;')
		}else {
			document.querySelector('.sort-arrow')?.removeAttribute('style')
		}
	}





	searchingInClickedOutside(): void {
		this.isSearchingInCategoryOpened = false
		document.querySelector('.searching-in-arrow')?.removeAttribute('style')
		if (this.currentSearchingInCategory.length === 0) {
			this.currentSearchingInCategory.push('title')
		}
	}
	languageClickedOutside(): void {
		this.isLanguageOpened = false
		document.querySelector('.languages-arrow')?.removeAttribute('style')
	}
	sortClickedOutside(): void {
		this.isSortingOpened = false
		document.querySelector('.sort-arrow')?.removeAttribute('style')
	}









	searchingInButtonClick(event: any): void {
		const checkboxList = document.querySelectorAll('.searching-in__item-checkbox')
		for (let i = 0; i < checkboxList?.length; i++) {
			const checkboxElement = (checkboxList[i] as HTMLInputElement)

			if (checkboxElement.value.toLowerCase() === event.target.id) {
				if (checkboxElement.checked) {
					checkboxElement.checked = false
					for (let i = 0; i < this.currentSearchingInCategory.length; i++) {
						if (this.currentSearchingInCategory[i] == checkboxElement.value.toLowerCase()) {
							this.currentSearchingInCategory.splice(i, 1)
						}
					}

				} else {
					checkboxElement.checked = true
					this.currentSearchingInCategory.push(checkboxElement.value.toLowerCase())
				}
			}
		}
	}
	selectLanguage(event: any): void {
		this.currentLanguage = event.target.innerText.toLowerCase()
		this.isLanguageOpened = false
	}
	sortingSelect(event: any): void {
		this.currentSortBy = event.target.innerText.toLowerCase()
		this.isSortingOpened = !this.isSortingOpened
	}











	constructor(
		private articlesService: ArticlesService,
		private changeDetection: ChangeDetectorRef,
		private differs: KeyValueDiffers,
	) {
		this.differ = this.differs.find({}).create()


		for (let i = 0; i < this.ISOCodes.length; i++) {
			this.languagesAndISOCodes[i] = {
				'language': JSON.stringify(new Intl.DisplayNames(['en'], { type: 'language' }).of(this.ISOCodes[i].toUpperCase())),
				'isoCode': this.ISOCodes[i]
			}
		}


		for (let i = 0; i < this.languagesAndISOCodes.length; i++) {
			this.languages.push(JSON.parse(this.languagesAndISOCodes[i].language))
		}

		this.languages.sort((a: any, b: any) => a.localeCompare(b, 'en', { 'sensitivity': 'base' }))
	}


	ngOnInit(): void {
		// this.loading = true

		this.articlesService.getArticlesEverythingOnLoad(this.currentSearchingInCategory, this.languageForSubmit(), this.currentSortBy, 1).subscribe((response) => {
			this.news = response.articles
			for (let i: number = 0; i < response.totalResults; i++) {
				if (i <= 20) {
					this.numberOfPagesForPagination.push(i + 1)
				} else {
					return
				}
			}
			// this.loading = false
		})
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
		this.articlesService.getArticlesEverythingSubnmit(this.currentSearchingInCategory, undefined, this.currentSortBy, pageNumber, undefined).subscribe((response) => {
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
		this.articlesService.getArticlesEverythingSubnmit(this.currentSearchingInCategory, undefined, this.currentSortBy, this.pageNumber, undefined).subscribe((response) => {
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
		this.articlesService.getArticlesEverythingSubnmit(this.currentSearchingInCategory, undefined, this.currentSortBy, this.pageNumber, undefined).subscribe((response) => {
			this.news = response.articles
			this.switchingPaginButtonActiveClass(this.pageNumber)
			this.changeDetection.detectChanges()
		})
	}

	submit(): void {
		this.q = (document.querySelector('.everythingt__search_input') as HTMLInputElement).value

		
		this.articlesService.getArticlesEverythingSubnmit(this.currentSearchingInCategory, this.languageForSubmit(), this.currentSortBy, 1, this.q).subscribe((response) => {
			this.news = response.articles
			// this.switchingPaginButtonActiveClass(pageNumber)
			this.numberOfPagesForPagination = []
			for (let i: number = 0; i < response.totalResults /  response.articles.length; i++) {
				if (i <= 20) {
					this.numberOfPagesForPagination.push(i + 1)
				} else {
					return
				}
			}
			this.changeDetection.detectChanges()
		})

	}
}