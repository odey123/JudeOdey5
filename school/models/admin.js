const db = require("../config/db");



const adminRegisterCourse = async (payload) => {
  const { name } = payload;
  const query = `
        insert into Courses(name)
        values($1)
        returning *
        `;
  const values = [name];
  const { rows } = await db.query(query, values);
  console.log(rows);
  return rows;
};

const adminDeleteCourse = async (payload) => {
  const query = `
        DELETE FROM Courses
        WHERE name = $1
        returning *
        `;
  const { rows } = await db.query(query, [payload.name]);
  //   console.log(rows);
  return rows;
};

const viewAllStudents = async (role) => {
  if (role == "admin") {
    const query = `
    SELECT * FROM students
    `;
    const { rows } = await db.query(query);
    return rows;
  } else {
    throw Error("Invalid role");
  }
};

const viewAllCourses = async (role) => {
  if (role == "admin") {
    const query = `
    SELECT * FROM courses
    `;
    const { rows } = await db.query(query);
    return rows;
  } else {
    throw Error("Invalid role");
  }
};

const dropStudent = async (payload) => {
  const query = `
        DELETE FROM Students
        WHERE username = $1
        returning *
        `;
  const { rows } = await db.query(query, [payload.username]);
  //   console.log(rows);
  return rows;
};

const viewAllAdmins = async (role) => {
  if (role == "admin") {
    const query = `
    SELECT * FROM Admins
    `;
    const { rows } = await db.query(query);
    return rows;
  } else {
    throw Error("Invalid role");
  }
};

const viewAllTeachers = async (role) => {
  if (role == "admin") {
    const query = `
    SELECT * FROM Teachers
    `;
    const { rows } = await db.query(query);
    return rows;
  } else {
    throw Error("Invalid role");
  }
};

const getAnAdmin = async (username) => {
  const query = `
    SELECT * FROM Admins 
    where username=$1 and role ='admin'
    `;
  const { rows } = await db.query(query, username);
  console.log(rows);
  return rows;
};

module.exports = {
  adminRegisterCourse,
  adminDeleteCourse,
  viewAllStudents,
  dropStudent, viewAllCourses, viewAllAdmins, viewAllTeachers,getAnAdmin
};
