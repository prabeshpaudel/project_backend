import mongoose from "mongoose";
const schema = new mongoose.Schema({
    course: String,
    quiz: String,
    name: String,
    type: String,
    points: String,
    description: String,
    options: String,
    correctAnswer: String,
  },
  { collection: "questions" }
);
export default schema;