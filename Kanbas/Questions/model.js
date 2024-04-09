import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("questions", schema);
export default model;