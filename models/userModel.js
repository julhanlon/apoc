const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, "is invalid"],
    index: true,
  },

  password: { type: String, required: true, minlength: 5 },
  displayName: { type: String },
  firstName: {type: String, default: ""},
  lastName: {type: String, default: ""},
  profilePic: {type: String, default: "/static/images/error.png"},
  location: {type: String, default: ""},
  phone: {type: String, default: ""},
});

module.exports = User = mongoose.model("User", userSchema);
