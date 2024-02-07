const jwt = require("jsonwebtoken");

const secretKey="BALABLU";

async function generateToken(payload) {
  const generatedToken = await jwt.sign(payload, secretKey, { expiresIn: "5s" });
  return generatedToken;
}

async function verifyToken(token) {
  try {
    const decoded = await jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    throw new Error("Invalid Token");
  }
}

module.exports = {generateToken,verifyToken};


