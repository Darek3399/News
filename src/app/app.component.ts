
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.Default
})
export class AppComponent implements OnInit {



	headlinesTabName: string = 'Top News'
	everythingtTabName: string = 'Global News'
	currentTabName: string = this.headlinesTabName


	ngOnInit(): void {
	}

	tabSelectionClick(event: any): void {
		const tabsList: any = document.querySelectorAll(`.nav__li`)
		this.currentTabName = event.target.innerText


		for (let i = 0; i < tabsList.length; i++) {
			if (tabsList[i].innerText === event.target.innerText) {
				for (let i = 0; i < tabsList.length; i++) {
					tabsList[i].classList.remove(`current-nav-tab`)
				}
				tabsList[i].classList.add(`current-nav-tab`)
			}
		}
	}


}
