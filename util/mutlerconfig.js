const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  
    destination: function(req,file,cb){
      cb(null, path.join(__dirname, '../util/uploads'));
    },
    filename: function (req, file, cb) {
        try{const ext = path.extname(file.originalname);
        const baseName = path.basename(file.originalname, ext);
        const timestamp = Date.now();
        cb(null, `${baseName}-${timestamp}${ext}`); // yha pr kuch ase file aayegi basename then ime then ext
 } catch(err){
  console(err);
 } }} 
      

    );
  
    const upload = multer({ storage: storage });
    
    module.exports = upload;