const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const bcrypt = require("bcryptjs");

//Teacher registration
router.post("/register",async function(req,res){
    console.log(req.body);
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password,salt);
    req.body.password = hash;

const newUser = new User({
    Name : req.body.name,
    contactnumber : req.body.contactnumber,
    address : req.body.address,
    email : req.body.email,
    password : req.body.password
});

try{
const user = newUser.save();
res.status(200).json({
    message : "Registration successfull"
})
}
catch(err){
console.log(err);
}

})


//User Login
router.post("/signin",async function(req,res){
 
    try{
        const user = await User.findOne({email:req.body.email});
        if(user){
            const bytes = await bcrypt.compare(req.body.password,user.password);
        
            if(bytes){
                
                const token = jwt.sign({_id:user._id},process.env.SECRET,{expiresIn:"1d"});
                console.log(token);
                res.status(200).json({
                    message : "Successfully LoggedIn",
                    token,
                    _id : user._id
                })
            }
            else{
                res.status(401).json({
                    message : "Invalid Password"
                })
            }
        }
        else{
            res.status(401).json({
                message : "User doesn't exist"
            })
        }
    }
    catch(err){
        res.status(500).json({
            message : err
        })
    }
})

module.exports = router;




