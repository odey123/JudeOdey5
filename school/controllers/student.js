const authModel = require("../models/auth");
const studentModel = require("../models/student");

const registerStudent = async (req, res) => {
  try {
    const result = await authModel.register(req.body);
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginStudent = async (req, res) => {
  try {
    const result = await authModel.login(req.body);
    console.log(result);
    if (result) {
      res.status(200).json({ message: "LOGIN SUCESSFUL", data: result });
    } else {
      res.status(400).json({ message: "INVALID INFORMATION" });
    }
  } catch (err) {}
};

const changeStudentPassword = async (req, res) => {
  try {
    const result = await authModel.changePassword(req.body);
    // console.log(result);
    if (result) {
      res.status(200).json({ message: "PASSWORD CHANGED", data: result });
    } else {
      res.status(400).json({ message: "INVALID INFORMATION" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const registerStudentCourse = async (req, res) => {
  try {
    const result = await studentModel.registerCourse(req.body);
    // console.log(result);
    if (result) {
      res.status(200).json({ message: "Course registered", data: result });
    } else {
      res.status(400).json({ message: "INVALID INFORMATION" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteStudentCourse = async (req, res) => {
  try {
    const result = await studentModel.deleteCourse(req.body);
    // console.log(result);
    if (result) {
      res.status(200).json({ message: "Course deleted", data: result });
    } else {
      res.status(400).json({ message: "INVALID INFORMATION" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getStudentProfile = async (req, res) => {
  try {
    const result = await studentModel.getStudent([req.params.username]);
    if (result) {
      res.status(200).json({ message: "Profile gotten", data: result });
    } else {
      res.status(400).json({ message: "INVALID INFORMATION" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getStudentCourses = async (req, res) => {
  try {
    const result = await studentModel.getStudentCourses([req.params.username]);
    if (result) {
      res.status(200).json({ message: "Courses gotten", data: result });
    } else {
      res.status(400).json({ message: "INVALID INFORMATION" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  registerStudent,
  loginStudent,
  changeStudentPassword,
  registerStudentCourse,
  deleteStudentCourse,
  getStudentProfile,
  getStudentCourses
};
