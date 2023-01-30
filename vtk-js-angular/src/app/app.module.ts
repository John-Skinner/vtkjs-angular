// Copyright (c) 2023 John Skinner
// All rights reserved.

//     Redistribution and use in source and binary forms, with or without
// modification, are permitted without any need to contact the author.

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
