import { ChangeDetectionStrategy, Component, Injectable, Input } from "@angular/core";
import { INewsResponse } from "src/app/models/modelNews";

@Injectable({
	providedIn: 'root'
})

@Component({
	selector: `app-news`,
	changeDetection: ChangeDetectionStrategy.Default,
	templateUrl: `./news.component.html`,
	styleUrls: [`./news.component.scss`],
})

export class NewsComponent {
	@Input() article: INewsResponse
}