const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  filepath: {
    type: String,
    required: true, 
  },
  downloaded: {
    type: Number,
    default: 0,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('File', fileSchema);
