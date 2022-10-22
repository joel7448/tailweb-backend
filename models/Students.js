const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    teacher : {type:String, required : true},
    Name: { type: String, required: true },
     marks : {type : Number , required : true},
    subject : {type:String , required : true},
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", StudentSchema);
