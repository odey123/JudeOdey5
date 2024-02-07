const express = require("express");
const router = express.Router();
const registerTeacherRoute = require("../controllers/lecturer");

router.post("/register", registerTeacherRoute.registerTeacher);
router.post("/login", registerTeacherRoute.loginTeacher);
router.put("/changePassword", registerTeacherRoute.changeTeacherPassword);
router.get("/getProfile/:username", registerTeacherRoute.getTeacherProfile);


module.exports = router;
