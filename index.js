const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const Userroute = require("./routes/user");
const StudenRoute = require("./routes/student")
dotenv.config();
app.use(cors({
    origin:"*"
}))

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.error(err);
  });

app.use(express.json());
app.use("/server/users",Userroute);
app.use("/server/students",StudenRoute);

app.listen(process.env.PORT||8800,()=>{
    console.log("Backend server is runing");
})