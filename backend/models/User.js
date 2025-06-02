import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String },
    image: { type: String },
    email: { type: String },
    password: { type: String }
})

const UserModel = mongoose.model("users", UserSchema)
export default UserModel