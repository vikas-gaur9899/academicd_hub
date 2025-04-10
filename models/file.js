const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  subject: String,
  filename: String,
uploadDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('File', fileSchema);
