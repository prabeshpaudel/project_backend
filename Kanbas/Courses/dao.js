import model from "./model.js";
export const findAllCourses = () => model.find();
export const createCourse = (course) => 
{
  delete course._id
  model.create(course);
}

export const updateCourse = (id, course) =>  model.updateOne({ _id: id }, { $set: course });
export const deleteCourse = (id) => model.deleteOne({ _id: id });

export const findCourseById = (courseId) => model.findById(courseId);
export const findCoursesByAuthor = (author) => model.find({ author: author });

// export const createUser = (user) => {
//   delete user._id
//   return model.create(user);
// }  
// export const findAllUsers = () => model.find();
// export const findUserById = (userId) => model.findById(userId);
// export const findUserByUsername = (username) =>  model.findOne({ username: username });
// export const findUserByCredentials = (username, password) =>  model.findOne({ username, password });
// export const updateUser = (userId, user) =>  model.updateOne({ _id: userId }, { $set: user });
// export const deleteUser = (userId) => model.deleteOne({ _id: userId });
// export const findUsersByRole = (role) => model.find({ role: role });