import mongoose from "mongoose";

const leaderSchema = new mongoose.Schema(
  {
    fullname: {type: String, required: true},
    dob: {type: Date, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: String, required: true},
    address: {type: String, required: true},
    department: {type: String, required: true},
    avatar:  {type: String, default: "https://res.cloudinary.com/desoarfu8/image/upload/v1759995051/images_ixruc3.png"},
  },
  { timestamps: true }
);

export default mongoose.model("Leader", leaderSchema);