const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true},
    contactnumber:{type:Number , required : true , unique:true},
        email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);