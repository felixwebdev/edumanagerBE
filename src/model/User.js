import mongoose from "mongoose";
import ROLE from "../config/role.js";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum: [ROLE.BGH, ROLE.CBHV, ROLE.GVCN, ROLE.HOCSINH, ROLE.GVBM], default: ROLE.HOCSINH},
    userId: {type: String, required: true, unique: true},
    isVerified: {type: Boolean, default: true},
}, 
{timestamps: true});

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);