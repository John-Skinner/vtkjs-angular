# vtkjs-angular
Simple example using vtk.js with Angular
# Using vtk.js with Angular

This is a quicktart tutorial for using vtk.js with Angular.
## Initialize your project
Angular documentation for getting started can be found at `http://angular.io/guide/setup-local`
Follow the instructions to install global angular  commandline interface @angu
Create an empty directory, say  `my-vtkjs-app`.

```angular2html
cd my-vtkjs-app 
ng new // respond to the prompts
cd vtk-cone // assuming you responded wit vtk-cone for the workspace name
npm i @kitware/vtk.js
npm i @angular-builders/custom-webpack // this allows us to customize webpack for vtk.js support
ng generate component components/cone-view

```

Customize the webpack build from what Angular's default webpack configuration
Edit angular.json to follow the sample below.
```
.
.
.

          "builder": "@angular-builders/custom-webpack:browser",
          "options": {
            "customWebpackConfig": {
              "path": "./webpack.config.js"
            },
```
Create a custom webpack, `webpack.config.js` to incorporate the vtk.js rules.
```
const vtkRules=require('@kitware/vtk.js/Utilities/config/dependency').webpack;
module.exports = {
  module: {
    rules: vtkRules.core.rules
  }
}
```
Develop the vtk.js by first providing an html div element to hold the
RenderWindow as suggested in `vtk-cone/src/app/components/cone-view.component.html`
```angular2html
<div #vtkDiv id="vtkDiv">

</div>
```
Add the vtk.js application code that uses the vtkDiv for the RenderWindow
In this example, we insert a pair of files to display an interactive cone.
## coneView.js
```

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
  constructor()
  {
  }
  getPixDims(dimPix)
  {
    if (dimPix.endsWith('px'))
    {
      let numPart=dimPix.substring(0,dimPix.length-2);
      let len=Number(numPart);
      return len;
    }
    else
    {
      return 0;
    }
  }
  Initialize(Div)
  {
    // Read the dimensions from the style which is allocated using the 'px' suffix
    
    let sw=this.getPixDims(Div.style.width);
    let sh = this.getPixDims(Div.style.height);
    if ((sw=== 0) || (sh === 0))
    {
      this.windowWidth=Div.clientWidth;
      this.windowHeight=Div.clientHeight;
    }
    else
    {
      this.windowWidth=sw;
      this.windowHeight=sh;
    }
    try
    {
      this.vtkRenderWindow = vtkRenderWindow.newInstance();
    }
    catch (e)
    {
      console.error('vtkrenderWindow newInstance error');
    }
  
    let initialValues = {background:[0,0,0]};
    this.openglRenderWindow = vtkOpenGLRenderWindow.newInstance(initialValues);
    this.openglRenderWindow.setContainer(Div);
    this.openglRenderWindow.setSize(this.windowWidth,this.windowHeight);
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
