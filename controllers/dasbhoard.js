// controllers/dashboardController.js
const path = require('path');
const fs = require('fs');
const File = require('../models/File'); // Mongoose model
const sharp = require('sharp');
//const libre = require('libreoffice-convert');

exports.getDashboardPage = (req, res) => {
  res.status(202);

};

exports.handleFileUpload = async (req, res) => {
    const filepath = req.body.subject;
    const file = req.file;
    if(!file){
        res.send(404).json({
            message : "plese uploadfile"

        })
    }
    const newfile = new file({
        subject :subject,
        filename : file.filename,
        filepath : file.path,

    })
    try {
        const success =  await newfile.save();
        
    }catch (err){
        console.log(err);
    }

  // Same as your earlier upload logic (PDF conversion)
  // Save into MongoDB too (with downloadCount: 0)
};

exports.handleFileDownload = async (req, res) => {
    const filename = req.query.filename;
    try{
        const file  =  await File.findOne({filename : filename});
        if(!file){
            res.status(404);

        }
        file.downloaded = file.downloaded + 1;
        await file.save();
        const fullpath =  path.resolve(file.filepath);
        res.download(fullpath);

    }catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
      }
    
  // Find file by subject or name
  // Increase downloadCount by 1
  // Send file as response
};

exports.getMostDownloadedFiles = async (req, res) => {
    try{
        const files = await File.find().sort({downloaded: -1}).limit(20);
        res.status(200).json({
            success: true,
            count : files.length,
            message : "file get",
            data : files



        })}catch (err) {
            console.error('Error fetching top downloaded files:', err);
            res.status(500).json({ success: false, message: 'server error ' });
          }
        
    
    }

 

