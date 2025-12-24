import mongoose from "mongoose";

const enrollmentFormSchema = new mongoose.Schema({
    studentId: {type: String, required: true},
    classId: {type: String},
    className: {type: String},
    enrollmentDate: {type: Date, required: true},
    status: {type: String, required: true, enum: [0,1], default: 0},
}, 
{timestamps: true});
export default mongoose.model("EnrollmentForm", enrollmentFormSchema);