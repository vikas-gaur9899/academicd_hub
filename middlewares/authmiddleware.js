const jwt = require('jsonwebtoken');
const User = require('../models/file');

module.exports = async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.redirect('/login')};

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return res.redirect('/login');

    req.user = user;
    next();
  } catch (err) {
    res.redirect('/login');
  }
};
