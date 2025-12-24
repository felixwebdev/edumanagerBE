import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    studentId: {type: String, required: true, unique: true},
    fullname: {type: String, required: true},
    dob: {type: Date, required: true},
    sex: {type: String, required: true},
    address: {type: String, required: true},
    parentContact: {type: String, required: true},
    yoe: {type: Number, required: true},
    avatar:  {type: String, default: "https://res.cloudinary.com/desoarfu8/image/upload/v1759995051/images_ixruc3.png"},
}, 
{timestamps: true});

export default mongoose.model("Student", studentSchema);