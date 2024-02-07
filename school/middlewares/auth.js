// const { REFUSED } = require("dns");
// const jwt = require("../utils/jwt");

// function auth(req,res,next){
//     try{
//         const token = req.cookies(token);
//         const decoded = jwt.verifyToken(token);
//         req.dayo = decoded;
//         Req={

//             dayo:{
//                 usernmae:"excellencyjumo",
//                 password:"dsfkdsfjksdbjfdsb"
//             }
//         }
//     }
//     catch(error){
//         res.status(500).json("ERROR OCCURED");
//     }
// }

// module.exports={auth}

import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Admin
/*
login(username,password,role)
register
when you register
verify that the username hasn't been used
create a course 
delete a course
get courses
get students
drop a student
*/

let admin = [];
let student = [];
let teacher = [];
let course = [];

// title;
// code;
// level;

// General routes

//Register Admin, Teacher/ Student
app.post("/register", (req, res) => {
  if (req.body.role == "admin") {
    let checkAdmin = admin.find((user) => user.username === req.body.username);
    if (checkAdmin) {
      res.json("This user already exists");
      return;
    } else {
      admin.push(req.body);
      res.json("SUCCESSFUL");
      return;
    }
  } else if (req.body.role == "teacher") {
    let checkTeacher = teacher.find(
      (user) => user.username === req.body.username
    );
    if (checkTeacher) {
      res.json("This user already exists");
      return;
    } else {
      teacher.push(req.body);
      res.json("SUCCESSFUL");
      return;
    }
  } else {
    let checkStudent = student.find(
      (user) => user.username === req.body.username
    );
    if (checkStudent) {
      res.json("This user already exists");
      return;
    } else {
      student.push(req.body);
      let courseEnrolled = [];
      res.json("SUCCESSFUL");
      return;
    }
  }
});

//Login Admin, Teacher/ Student
app.post("/login", (req, res) => {
  if (req.body.role == "admin") {
    let checkAdminPassword = admin.find(
      (user) => user.password === req.body.password
    );
    let checkAdminUsername = admin.find(
      (user) => user.username === req.body.username
    );
    if (checkAdminPassword && checkAdminUsername) {
      res.json("Login Successful");
      return;
    } else {
      res.json("incorrect password or Username, try again");
      return;
    }
  }
  if (req.body.role == "teacher") {
    let checkTeacherPassword = teacher.find(
      (user) => user.password === req.body.password
    );
    let checkTeacherUsername = teacher.find(
      (user) => user.username === req.body.username
    );
    if (checkTeacherPassword && checkTeacherUsername) {
      res.json("Login Successful");
      return;
    } else {
      res.json("incorrect password or Username, try again");
      return;
    }
  } else {
    let checkStudentPassword = student.find(
      (user) => user.password === req.body.password
    );
    let checkStudentUsername = student.find(
      (user) => user.username === req.body.username
    );
    if (checkStudentPassword && checkStudentUsername) {
      res.json("Login Successful");
      return;
    } else {
      res.json("incorrect password or Username, try again");
      return;
    }
  }
});

//Reset password(Where I stopped)
app.put("/reset-password/:role", (req, res) => {
  if (req.params.role == "admin") {
    let getAdmin = admin.find((finder) => finder.username == req.body.username);
    if (getAdmin) {
      let indexOfAdmin = admin.indexOf(getAdmin);
      if (admin[indexOfAdmin].password == req.body.previous) {
        admin[indexOfAdmin].password = req.body.new;
        res.json("Password changed successfully");
      } else {
        res.json("Previous password incorrect");
      }
    } else {
      res.json("User with the username not found");
    }
  } else if (req.params.role == "teacher") {
    let getTeacher = teacher.find(
      (finder) => finder.username === req.body.username
    );
    if (getTeacher) {
      let indexOfTeacher = teacher.indexOf(getTeacher);
      if (teacher[indexOfTeacher].password == req.body.previous) {
        teacher[indexOfTeacher].password = req.body.new;
        res.json("Password changed successfully");
      } else {
        res.json("Previous password incorrect");
      }
    } else {
      res.json("User with the username not found");
    }
  } else {
    let getStudent = student.find(
      (finder) => finder.username === req.body.username
    );
    if (getStudent) {
      let indexOfStudent = student.indexOf(getStudent);
      if (student[indexOfStudent].password == req.body.previous) {
        student[indexOfStudent].password = req.body.new;
        res.json("Password changed successfully");
      } else {
        res.json("Previous password incorrect");
      }
    } else {
      res.json("User with the username not found");
    }
  }
});

//get-courses
app.get("/get-courses", (req, res) => {
  res.json(course);
});

//Admin
//course creation
app.post("/course-creation/:role", (req, res) => {
  if (req.params.role == "admin") {
    let courseCheck = course.find(
      (check) => check.coursename === req.body.coursename
    );
    if (courseCheck) {
      res.json("Course already exists, check your coursename");
    } else {
      course.push(req.body);
      res.json("SUCCESSFUL");
    }
  } else {
    res.json("UNAUTHORIZED");
  }
});

//course deletion
app.delete("/delete-course/:role", (req, res) => {
  if (req.params.role == "admin") {
    const courseToDelete = course.find(
      (courseItem) => courseItem.coursename === req.body.coursename
    );
    if (courseToDelete) {
      let deletedCourseIndex = course.indexOf(courseToDelete);
      course.splice(deletedCourseIndex, 1)[0];
      res.json("DELETED SUCCESSFULLY");
    } else {
      res.json("COURSE DOES NOT EXIST");
    }
  } else {
    res.json("UNAUTHORIZED");
  }
});

//student deletion
app.delete("/delete-student/:role", (req, res) => {
  if (req.params.role == "admin") {
    let findStudent = student.find(
      (check) => check.username === req.body.username
    );
    if (findStudent) {
      let studentDelete = student.indexOf(findStudent);
      course.splice(studentDelete, 0);
      res.json("Student Successfully Dropped");
    } else {
      res.json("Student not found");
    }
  } else {
    res.json("UNAUTHORIZED");
  }
});

//get students by an admin
app.get("/get-student/:role", (req, res) => {
  if (req.params.role == "admin") {
    res.json(student);
  } else {
    res.json("UNAUTHORIZED");
  }
});

//Teacher

//get profile
app.get("/get-teacher-profile/:role", (req, res) => {
  if (req.params.role == "teacher") {
    let profileFind = teacher.find(
      (finder) => finder.username === req.body.username
    );
    if (profileFind) {
      res.json(profileFind);
      return;
    } else {
      res.json("Details not found");
      return;
    }
  } else {
    res.json("UNAUTHORIZED");
    return;
  }
});

//get students
app.get("/get-student/:role", (req, res) => {
  if (req.params.role == "teacher") {
    res.json(student);
  } else {
    res.json("UNAUTHORIZED");
  }
});

//Students

app.listen(1000, () => {
  console.log("Server listening on port 1000");
});