// Copyright (c) 2023 John Skinner
// All rights reserved.

//     Redistribution and use in source and binary forms, with or without
// modification, are permitted without any need to contact the author.
import {Component, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConeView} from "./coneView";


@Component({
    selector: 'app-cone-view',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './cone-view.component.html',
    styleUrls: ['./cone-view.component.css']
})
export class ConeViewComponent implements AfterViewInit {
    @ViewChild('vtkDiv') vtkDiv!: ElementRef;

    ngAfterViewInit() {
        let container = this.vtkDiv.nativeElement;
        let cs = new ConeView();
        cs.Initialize(container);
    }
}
