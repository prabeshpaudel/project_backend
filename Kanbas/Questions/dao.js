import model from "./model.js";
export const findQuestionsForQuiz = (courseID, quizID) => model.find({ course: courseID, quiz: quizID });
export const findQuestionById = (Id) => model.findById(Id);

export const createQuestion = (cid, qid, question) => 
{
  delete question._id
  question.course = cid;
  question.quiz = qid;
  model.create(question);
}

export const updateQuestion   = (id, question) =>  model.updateOne({ _id: id }, { $set: question });
export const deleteQuestion   = (id) => model.deleteOne({ _id: id });