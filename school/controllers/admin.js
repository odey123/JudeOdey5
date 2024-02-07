const authModel = require("../models/auth");
const adminModel = require("../models/admin");

async function registerAdmin(req, res){
  try {
    const result = await authModel.register(req.body);
    if(result){

      res.cookie(token,"token value", { expiresIn: "5s" });
      res.status(200).json(result);
    }else{
      res.status(400).json("USER EXISTS ALREADY")
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const loginAdmin = async (req, res) => {
  try {
    const result = await authModel.login(req.body);
    console.log(result);
    if (result[0]) {
      res.cookie(token,"token value");
      res.status(200).json({ message: "LOGIN SUCESSFUL", data: result });
    } else {
      res.status(400).json({ message: "INVALID INFORMATION" });
    }
  } catch (err) {
    res.status(500).json("ERROR ON THE END OF THE SERVER")
  }
};

const changeAdminPassword = async (req, res) => {
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

const adminRegisterCourse = async (req, res) => {
  try {
    const adminUsername = req.dayo.username
    const result = await adminModel.adminRegisterCourse(admin,req.body);
    console.log(result);
    res.status(200).json({ message: "Course registered", data: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const adminDeleteCourse = async (req, res) => {
  try {
    const result = await adminModel.adminDeleteCourse(req.body);
    console.log(result);
    res.status(200).json({ message: "Course deleted", data: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const result = await adminModel.viewAllStudents([req.params.role]);
    console.log(result);
    res.status(200).json({ message: "Students:", data: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const dropStudent = async (req, res) => {
  try {
    const result = await adminModel.dropStudent(req.body);
    console.log(result);
    res.status(200).json({ message: "Student dropped:", data: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const viewAllCourses = async (req, res) => {
  try {
    const result = await adminModel.viewAllCourses([req.params.role]);
    console.log(result);
    res.status(200).json({ message: "Courses:", data: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const viewAllAdmins = async (req, res) => {
  try {
    const result = await adminModel.viewAllAdmins([req.params.role]);
    console.log(result);
    res.status(200).json({ message: "Admins:", data: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const viewAllTeachers = async (req, res) => {
  try {
    const result = await adminModel.viewAllTeachers([req.params.role]);
    console.log(result);
    res.status(200).json({ message: "Teachers:", data: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAdminProfile = async (req, res) => {
  try {
    const result = await adminModel.getAnAdmin([req.params.username]);
    if (result) {
      res.status(200).json({ message: "Profile gotten", data: result });
    } else {
      res.status(400).json({ message: "INVALID INFORMATION" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  changeAdminPassword,
  adminRegisterCourse,
  adminDeleteCourse,
  getAllStudents,
  dropStudent,
  viewAllCourses,
  viewAllAdmins,
  viewAllTeachers,
  getAdminProfile
};
