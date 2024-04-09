import mongoose from "mongoose";
const schema = new mongoose.Schema({
    name: String,
    number: String,
    startDate: Date,
    endDate: Date,
    description: String,
    author: String,
  },
  { collection: "courses" }
);
export default schema;