import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
    subjectId: {type: String, required: true, unique: true},
    name: {type: String, required: true},
}, 
{timestamps: true});

export default mongoose.model("Subject", subjectSchema);