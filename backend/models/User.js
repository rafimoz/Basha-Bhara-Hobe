import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String },
    image: { type: String },
    phone: { type: String, default:"+000000000" },
    email: { type: String, unique: true },
    password: { type: String },
    googleId: { type: String }
}, { timestamps: true })

const UserModel = mongoose.model("users", UserSchema)
export default UserModel