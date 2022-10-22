const router = require("express").Router();

const Student = require("../models/Students");
const authenticate = require("../verifytoken");


//Student registration
router.post("/register",authenticate,async function(req,res){
console.log(req.body.teacher)
   const prestudents = await Student.findOne({Name:req.body.name, subject:req.body.subject, teacher:req.body.teacher});
   
   console.log(prestudents);
if(prestudents){
    var mark = prestudents.marks;
    console.log(prestudents);
    await Student.findOneAndUpdate({Name:req.body.name,subject:req.body.subject,teacher:req.body.teacher},{$inc : {"marks" : req.body.marks}})
}
else if(prestudents==null)
{
const newStudent = new Student({
    Name : req.body.name,
   marks : req.body.marks,
   subject : req.body.subject,
   teacher : req.body.teacher
   
    

});

try{
const user = newStudent.save();
res.status(200).json({
    message : "Registration successfull",
    user
})
}
catch(err){
    res.status(500).json({
        message: err
    })
console.log(err);
}
}
})

//GET all the students
router.get("/students/:id",authenticate,async function(req,res){
    try{
        
const students = await Student.find({teacher:req.params.id});
res.status(200).json(students);
    }
    catch(err){
        console.log(err);
    }

})

//Filter with name
router.post("/filter",authenticate,async function(req,res){
    try{
    const students = await Student.find({ Name :req.body.name , teacher :req.body.teacher });
    res.status(200).json(students);
    }
catch(err){
    res.status(500).json(err);
}
})

//edit student details
router.put("/edit/:id",authenticate,async function(req,res){
   console.log(req.params.id);
    try{
await Student.findOneAndUpdate({_id:req.params.id},{$set:{name:req.body.name,subject:req.body.subject,marks:req.body.marks }});
res.status(200).json({
    message : "Successfully Updated"
})
    }
    catch(err){
res.status(500).json({
    message : err
})
    }
})

router.delete("/delete/:id",authenticate,async function(req,res){
    try{
    await Student.findByIdAndDelete({_id:req.params.id});
res.status(200).json({
    message : "Student deleted"
})    
}
catch(err){
    res.status(500).json({
        message :err
    })
}

})


module.exports = router