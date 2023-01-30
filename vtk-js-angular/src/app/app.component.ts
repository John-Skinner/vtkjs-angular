// Copyright (c) 2023 John Skinner
// All rights reserved.

//     Redistribution and use in source and binary forms, with or without
// modification, are permitted without any need to contact the author.

import { Component } from '@angular/core';
import {ConeViewComponent} from "./components/cone-view/cone-view.component";

@Component({
  standalone:true,
  selector: 'app-root',
  imports: [ConeViewComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vtk-js-angular';
}
