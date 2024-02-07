const db = require("../config/db");

async function checkUser(username, role) {
  const query = `
  SELECT * FROM ${role}s
  WHERE username = $1
  `
  const { rows } = await db.query(query, [username]);
  return rows[0];
}

async function register(payload) {
  const { username, password, role } = payload;
  const query = `
  insert into ${role}s(username, password, role)
  values($1, $2, $3)
  returning *
  `;
  try {
    const user = await checkUser(username, role)
    console.log("USER",user);
    if (user) {
      console.log("USER",user);
      return false;
    }
    else if (role == "admin") {
      const values = [username, password, role];
      const { rows } = await db.query(query, values);
      return rows;
    } else if (role == "teacher") {

      const values = [username, password, role];
      const { rows } = await db.query(query, values);
      console.log(rows);
      return;
    } else if (role == "student") {
      const values = [username, password, role, courses];
      const { rows } = await db.query(query, values);
      //   console.log(result.rows[0]);
      return rows;
    } else {
      throw Error("Invalid role");
    }
  } catch (error) {
    console.log(error.message);
    throw Error(error);
  }
};

const login = async (payload) => {
  const { username, password, role } = payload;
  const query = `
            SELECT * FROM ${role}s
            WHERE username = $1 AND password = $2
            `;
  try {
    if (role == "admin") {
      const values = [username, password];
      const { rows } = await db.query(query, values);
      return rows;
    } else if (role == "teacher") {
      const query = `
            SELECT * FROM teachers
            WHERE username = $1 AND password = $2
            `;
      const values = [username, password];
      const { rows } = await db.query(query, values);
      //   console.log(result.rows[0]);
      return rows;
    } else if (role == "student") {
      const query = `
            SELECT * FROM students
            WHERE username = $1 AND password = $2
            `;
      const values = [username, password];
      const { rows } = await db.query(query, values);
      //   console.log(result.rows[0]);
      return rows;
    } else {
      throw Error("Invalid role");
    }
  } catch (error) {
    console.log(error.message);
  }
};

// const changePassword = async(payload, newPassword) => {
//     const { username, password, role } = payload;
//     try {
//         if (role = "admin") {
//             const query = `
//             UPDATE admin
//             SET username = 'newStud'
//             WHERE password = $2
//             returning *
//             `;
//             const updateValues = []
//         }
//     } catch {

//     }
// }

const changePassword = async (payload) => {
  const { username, role, newPassword } = payload;
  try {
    if (role == "admin") {
      const query = `
      UPDATE admins
      SET password = $2
      WHERE username = $1
      RETURNING *
    `;
      const updateValues = [username, newPassword];
      const { rows } = await db.query(query, updateValues);
      console.log(rows)
      return rows;
    } else if (role == "student") {
      const query = `
      UPDATE students
      SET password = $2
      WHERE username = $1
      RETURNING *
    `;
      const updateValues = [username, newPassword];
      const { rows } = await db.query(query, updateValues);
      console.log(rows)
      return rows;
    } else if (role == "teacher") {
      const query = `
      UPDATE teachers
      SET password = $2
      WHERE username = $1
      RETURNING *
    `;
      const updateValues = [username, newPassword];
      const { rows } = await db.query(query, updateValues);
      console.log(rows)
      return rows;
    } else {
      throw Error("Invalid role");
    }
  } catch (error) {
    return { error: error.message };
  }
};

// changePassword({username:"tayme11", role:"admin", newPassword:"4455"});
// const Payload = {
//     username: "student1", password:"passworded", role:"student"
// }

// register(Payload)
// login(Payload)

// get a specific admin
const getAdmin = async (x) => {
  const query = `
    SELECT * FROM Admins where username=$1`;
  const { rows } = await db.query(query, x);
  console.log(rows);
};
// getAdmin(["tayme12"])

// get all admins
const getAll = async () => {
  const query = `
    SELECT * FROM Admins`;
  const { rows } = await db.query(query);
  console.log(rows);
};

// getAll();



// adminRegisterCourse("French")


module.exports = { register, login, changePassword };
