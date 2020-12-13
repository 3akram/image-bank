const fs    = require('fs');
const shell = require('shelljs');

module.exports = multer => {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            const uploads    = 'uploads'
            const year       = new Date().getFullYear().toString();
            const month      = new Date().getMonth().toString();
            const day        = new Date().getDay();
            const finalPath  = `${uploads}/${year}/${month}/${day}/`
            
            if(!fs.existsSync(finalPath)) {
                shell.mkdir('-p', finalPath);   
            }
            cb(null, finalPath);
        },
        filename: (req, file, cb) => {
            cb(null, new Date().toISOString()+file.originalname);
        }
    })
};
