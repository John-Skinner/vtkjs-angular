
// This is only an example for customized webpack if the application
// needs to use custom webpack settings; using module federation for example.

const vtkRules=require('@kitware/vtk.js/Utilities/config/dependency').webpack;
module.exports = {
  module: {
    rules: vtkRules.core.rules
  }
}

