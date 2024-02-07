const db = require("../config/db")
const getTeacher = async(username) => {
    const query = `
    SELECT * FROM Teachers 
    where username=$1 and role ='teacher'
    `;
    const { rows } = await db.query(query, username);
    console.log(rows);
    return rows;
}

module.exports = {getTeacher};