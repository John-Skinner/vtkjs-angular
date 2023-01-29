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
