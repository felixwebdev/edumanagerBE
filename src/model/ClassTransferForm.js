import mongoose from "mongoose";

const classTransferFormSchema = new mongoose.Schema({
    studentId: {type: String, required: true},
    newClassId: {type: String, required: true},
    oldClassId: {type: String, required: true},
    reason: {type: String, required: true},
}, 
{timestamps: true});
export default mongoose.model("ClassTransferForm", classTransferFormSchema);