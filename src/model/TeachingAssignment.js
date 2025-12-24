import mongoose from "mongoose";

const TeachingAssignmentSchema = new mongoose.Schema({
  teacher: {type: String, required: true},
  subject: {type: String, required: true},
  subjectName: {type: String},
  class: {type: String, required: true},
  className: {type: String},
  year: {type: Number, required: true},
}, {timestamps: true});

export default mongoose.model("TeachingAssignment", TeachingAssignmentSchema);