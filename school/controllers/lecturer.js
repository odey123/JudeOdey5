const authModel = require("../models/auth");
const lecturerModel = require("../models/lecturer")

const registerTeacher = async (req, res) => {
  try {
    const result = await authModel.register(req.body);
    console.log(result);
    res.status(200).json({ message: "REGISTRATION SUCESSFUL", data: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginTeacher = async (req, res) => {
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

const changeTeacherPassword = async (req, res) => {
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

const getTeacherProfile = async (req, res) => {
    try{
        const result = await lecturerModel.getTeacher([req.params.username])
        if (result) {
          res.status(200).json({ message: "Profile gotten", data: result });
        } else {
          res.status(400).json({ message: "INVALID INFORMATION" });
        }
    }catch(err){
        res.status(500).json({ message: err.message });
    }
}
module.exports = { registerTeacher, loginTeacher, changeTeacherPassword, getTeacherProfile };
