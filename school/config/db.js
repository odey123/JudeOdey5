const {Client} = require("pg");

const client = new Client({
  host: "localhost",
  port: 5432,
  database: "school",
  user: "postgres",
  password: "password",
});

client.connect((error)=>{
  if(error){
    throw Error(error);
  }
  else{
    console.log("DATABASE RUNNING")
  }
});

module.exports = client;