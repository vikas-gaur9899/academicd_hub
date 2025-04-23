const jwt = require('jsonwebtoken');

exports.createToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' }); //  this crete token 
  return token;
};

exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET); // Verify the token
  } catch (err) {
    throw new Error('Invalid or expired token'); // Handle errors (e.g., expired token)
  }
};