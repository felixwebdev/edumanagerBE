import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    fullname: {type: String, required: true},
    dob: {type: Date, required: true},
    sex: {type: String, required: true},
    address: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: String, required: true},
},
{timestamps: true});
 
export default mongoose.model("Teacher", teacherSchema);