const express = require("express");
const app = express();
app.use(express.json());

const adminRoute = require("./route/admin.js");
const teacherRoute = require("./route/lecturer.js");
const studentRoute = require("./route/student.js");

app.use("/admin", adminRoute);
app.use("/teacher", teacherRoute);
app.use("/student", studentRoute);
app.use((error,req,res,next)=>{
  res.json("URL NOT FOUND");
})
app.listen(8080, () => {
  console.log("server running");
});