import mongoose from "mongoose";
const schema = new mongoose.Schema({
    name: String,
    description: String,
    course: String,
    dueDate: String,
    availableDate: String,
    untilDate: String,
    type: String,
    assignmentGroup: String,
    shuffleAnswers: String,
    timeLimit: String,
    multipleAttempts: String,
    showCorrectAnswers: String,
    accessCode: String,
    oneQuestionAtATime: String,
    webcamRequired: String,
    lockQuestionsAfterAnswering: String,
    publish: String,
    points: String,
  },
  { collection: "quizzes" }
);
export default schema;