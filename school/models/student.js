const db = require("../config/db");
const registerCourse = async (payload) => {
  const { username, courses } = payload;
  const query = `
    UPDATE Students
    SET courses = array_append(courses, $2)
    WHERE username = $1 and role = 'student'
    returning *
    `;
  const values = [username, courses];
  const { rows } = await db.query(query, values);
  console.log(rows);
  return rows;
};

const deleteCourse = async (payload) => {
  const { username, courses } = payload;
  const query = `
    UPDATE Students
    SET courses = array_remove(courses, $2)
    WHERE username = $1 and role = 'student'
    returning *
    `;
  const values = [username, courses];
  const { rows } = await db.query(query, values);
  console.log(rows);
  return rows;
};

const getStudent = async (username) => {
  const query = `
    SELECT * FROM Students
    where username=$1 and role ='student'
    `;
  const { rows } = await db.query(query, username);
  console.log(rows);
  return rows;
};

const getStudentCourses = async (username) => {
  const query = `
    SELECT courses
    FROM Students
    WHERE username = $1;
    `;
  const { rows } = await db.query(query, username);
  console.log(rows);
  return rows;
};
module.exports = { registerCourse, deleteCourse, getStudent, getStudentCourses };
