import model from "./model.js";
export const findQuizzesForCourse = (courseID) => model.find({ course: courseID });
export const findQuizById = (Id) => model.findById(Id);

export const createQuiz = (cid, quiz) => 
{
  delete quiz._id
  quiz.course = cid;
  model.create(quiz);
}

export const updateQuiz = (id, quiz) =>  model.updateOne({ _id: id }, { $set: quiz });
export const deleteQuiz  = (id) => model.deleteOne({ _id: id });