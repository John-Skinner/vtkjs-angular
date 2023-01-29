const vtkRules=require('@kitware/vtk.js/Utilities/config/dependency').webpack;
module.exports = {
  module: {
    rules: vtkRules.core.rules
  }
}

