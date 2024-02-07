const express = require("express");
const router = express.Router();
const registerStudentRoute = require("../controllers/student");

router.post("/register", registerStudentRoute.registerStudent);
router.post("/login", registerStudentRoute.loginStudent);
router.put("/changePassword", registerStudentRoute.changeStudentPassword);
router.post("/registerStudentCourse", registerStudentRoute.registerStudentCourse);
router.delete("/deleteStudentCourse", registerStudentRoute.deleteStudentCourse);
router.get("/getProfile/:username", registerStudentRoute.getStudentProfile);
router.get("/getCourses/:username", registerStudentRoute.getStudentCourses);





module.exports = router;
