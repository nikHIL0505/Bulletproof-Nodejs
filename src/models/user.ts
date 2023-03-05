import mongoose from "mongoose";

const User = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Name is the required property"],
    index: true,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    require: [true, "Email is the required property"],
  },
  password: {
    type: String,
    require: [true, "Password is the required property"],
  },
  salt: {
    type: String,
  },
  role: {
    type: String,
    enum: ["INTERNAL_USER", "CONSUMER_USER"],
    default: "CONSUMER_USER",
  },
});

export default mongoose.model("Users", User);
