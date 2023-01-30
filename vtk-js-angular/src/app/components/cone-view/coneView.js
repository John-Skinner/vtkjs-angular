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
  constructor()
  {
  }
  getPixDims(dimPix)
  {
    if (dimPix.endsWith('px'))
    {
      const numPart=dimPix.substring(0,dimPix.length-2);
      return Number(numPart);
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
