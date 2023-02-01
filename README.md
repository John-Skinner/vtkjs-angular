# vtkjs-angular
Simple example using vtk.js with Angular
# Using vtk.js with Angular

This is a quick start tutorial for using vtk.js with Angular.
## Initialize your project
Angular documentation for getting started can be found at [http://angular.io/guide/setup-local](http://angular.io/guide/setup-local)
Install the angular cli (the `ng` command).
```
$ npm i -g @angular/cli
```
Create an empty directory, say  `my-vtkjs-app`.

```
$ cd my-vtkjs-app 
$ ng new // respond to the prompts
$ cd vtk-cone // assuming you responded wit vtk-cone for the workspace name
$ npm i @kitware/vtk.js
$ npm i @angular-builders/custom-webpack // this allows us to customize webpack for vtk.js support
$ ng generate component components/cone-view

```

Develop the vtk.js by first providing an html div element to hold the
RenderWindow as suggested in `vtk-cone/src/app/components/cone-view.component.html`
```
<div #vtkDiv id="vtkDiv">

</div>
```
Add the vtk.js application code that uses the vtkDiv for the RenderWindow
In this example, we insert a pair of files to display an interactive cone.
## coneView.js

```
// Copyright (c) 2023 John Skinner
// All rights reserved.

//     Redistribution and use in source and binary forms, with or without
// modification, are permitted without any need to contact the author.
import '@kitware/vtk.js/Rendering/Profiles/Geometry'
import '@kitware/vtk.js/Rendering/Profiles/Volume'
import vtkRenderWindowInteractor from "@kitware/vtk.js/Rendering/Core/RenderWindowInteractor";
import vtkInteractorStyleTrackballCamera from "@kitware/vtk.js/Interaction/Style/InteractorStyleTrackballCamera";
import vtkMapper from '@kitware/vtk.js/Rendering/Core/Mapper';
import vtkConeSource from '@kitware/vtk.js/Filters/Sources/ConeSource';
import vtkActor from '@kitware/vtk.js/Rendering/Core/Actor';
import vtkOpenGLRenderWindow from "@kitware/vtk.js/Rendering/OpenGL/RenderWindow";
import vtkRenderWindow from "@kitware/vtk.js/Rendering/Core/RenderWindow";
import vtkRenderer from '@kitware/vtk.js/Rendering/Core/Renderer';

export class ConeView
{

    Initialize(Div)
    {
        this.windowWidth = Div.clientWidth;
        this.windowHeight = Div.clientHeight;
        try
        {
            this.vtkRenderWindow = vtkRenderWindow.newInstance();
        } catch (e)
        {
            console.error('vtkrenderWindow newInstance error');
        }

        const initialValues = {background: [0, 0, 0]};
        this.openglRenderWindow = vtkOpenGLRenderWindow.newInstance(initialValues);
        this.openglRenderWindow.setContainer(Div);
        this.openglRenderWindow.setSize(this.windowWidth, this.windowHeight);
        this.vtkRenderWindow.addView(this.openglRenderWindow);
        const coneSource = vtkConeSource.newInstance();
        const actor = vtkActor.newInstance();
        const mapper = vtkMapper.newInstance();
        actor.setMapper(mapper);
        mapper.setInputConnection(coneSource.getOutputPort());
        const renderer = vtkRenderer.newInstance();
        this.vtkRenderWindow.addRenderer(renderer);
        const interactor = vtkRenderWindowInteractor.newInstance();
        interactor.setInteractorStyle(
            vtkInteractorStyleTrackballCamera.newInstance()
        );
        interactor.setView(this.openglRenderWindow);
        interactor.initialize();
        interactor.bindEvents(Div);
        renderer.addActor(actor);
        renderer.resetCamera();
        this.vtkRenderWindow.render();
    }
}


```
## coneView.d.ts
```
export declare class ConeView
{
constructor();
  Initialize(div:any):void;
}
```
## cone-view.component.ts
```
import {CommonModule} from '@angular/common';
import {ConeView} from "./coneView";


@Component({
  selector: 'app-cone-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cone-view.component.html',
  styleUrls: ['./cone-view.component.css']
})
export class ConeViewComponent implements AfterViewInit
{
  @ViewChild('vtkDiv') vtkDiv!: ElementRef;

  ngAfterViewInit()
  {
    let container = this.vtkDiv.nativeElement;
    let cs = new ConeView();
    cs.Initialize(container);
  }
}

```
## cone-view.component.css
```
#vtkDiv {
  width:200px;
  height: 200px;
}
```
## Running using Angular's Development Environment
```
$ ng serve

```
Go to url: `http://localhost:4200` to see the web page.
