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

  passoword: {
    type: String,
  },

  salt: {
    type: String,
  },

  role: {
    type: String,
    enum: ["INTERNAL_USER", "CONSUMER_USER"],
  },
});

export default mongoose.model("Users", User);
