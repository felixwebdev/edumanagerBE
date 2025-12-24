import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
    className: {type: String, required: true},
    grade: {type: Number, required: true},
    quantity: {type: Number, required: true},
    homeroomTeacher: {type: String, required: true},
}, 
{timestamps: true});
export default mongoose.model("Class", classSchema);