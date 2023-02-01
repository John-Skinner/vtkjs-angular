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
