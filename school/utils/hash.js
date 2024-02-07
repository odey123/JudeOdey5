const bcrypt = require("bcryptjs");

async function hashPassword(password){
  const hashedPassword = await bcrypt.hash(password,5);
  return hashedPassword;
}

async function comparePassword(password,hashedPassword){
  const decryptedPassword = await bcrypt.compare(password,hashedPassword);
  return decryptedPassword;
}

let password = "PASS1234";

async function runBcrypt(password){
  const result = await hashPassword(password);
  console.log(result);
  const check = await comparePassword("PASS1234",result);
  console.log(check);
} 

runBcrypt(password);