import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadlinesComponent } from './components/headlines/headlines.component';
import { NewsComponent } from './components/headlines/news/news.component';
import { ClickOutsideDirective } from './clickOutsideCountry.derective';
import { clickOutsideCategory } from './clickOutsideCategory.derective';
import { PaginationComponent } from './components/pagination/pagination.component';
import { EverythingComponent } from './components/everything/everything.component';
import { ClickOutsideLanguage } from './clickOutsideLanguage.derective ';
import { ClickOutsideSearchIn } from './clickOutsideSearchIn.derective';
import { ClickOutsideSort } from './clickOutsideSort.derective';
import { ErrorComponent } from './components/error/error.component';


@NgModule({
	declarations: [
		AppComponent,
		HeadlinesComponent,
		EverythingComponent,
		NewsComponent,
		PaginationComponent,
		ClickOutsideDirective,
		clickOutsideCategory,
		ClickOutsideLanguage,
		ClickOutsideSearchIn,
		ClickOutsideSort,
		ErrorComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
