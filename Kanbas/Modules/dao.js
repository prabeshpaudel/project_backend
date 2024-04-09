import model from "./model.js";
export const findModulesForCourse = (courseID) => model.find({ course: courseID });


export const createModule = (cid,module) => 
{
  delete module._id
  module.course = cid;
  model.create(module);
}

export const updateModule  = (id, module) =>  model.updateOne({ _id: id }, { $set: module });
export const deleteModule  = (id) => model.deleteOne({ _id: id });