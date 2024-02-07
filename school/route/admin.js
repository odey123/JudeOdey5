const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");
const Auth = require("../middlewares/auth");

router.post("/register",adminController.registerAdmin);
router.post("/login", adminController.loginAdmin);
router.put("/changePassword", adminController.changeAdminPassword);
router.post("/registerCourse",Auth.auth, adminController.adminRegisterCourse);
router.delete("/deleteCourse", adminController.adminDeleteCourse);
router.get("/viewStudents/:role", adminController.getAllStudents);
router.delete("/dropStudent", adminController.dropStudent);
router.get("/viewCourses/:role", adminController.viewAllCourses);
router.get("/viewAdmins/:role", adminController.viewAllAdmins);
router.get("/viewTeachers/:role", adminController.viewAllTeachers);
router.get("/viewAdmin/:username", adminController.getAdminProfile);

module.exports = router;
