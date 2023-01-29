import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ConeViewComponent} from "./components/cone-view/cone-view.component";
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    ConeViewComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
