// routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const upload = require('../middlewares/multer'); // multer middleware

// Dashboard page
router.get('/', dashboardController.getDashboardPage);///isko simple krsakte 

// Upload route
router.post('/upload', upload.single('file'), dashboardController.handleFileUpload); // mutler use ho rha hai file ko update kr rha hai 

// Download route (with search)
router.post('/download', dashboardController.handleFileDownload);

// Most downloaded files
router.get('/most-downloaded', dashboardController.getMostDownloadedFiles);

module.exports = router;
