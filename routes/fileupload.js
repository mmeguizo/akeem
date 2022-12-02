const File = require('../models/fileupload'); // Import User Model Schema
const { v4: uuidv4 } = require('uuid');
const hash = require('../config/password-hasher');
const mongoose = require('mongoose');
let bcrypt = require('bcryptjs');
const formidable = require('formidable');
const path = require('path')
const ObjectId = mongoose.Types.ObjectId;
let fs = require('fs');
const { fail } = require('assert');


module.exports = (router) => {
    

        router.post('/addFile', (req, res) => {


            const form = new formidable.IncomingForm();
            const uploadFolder = path.join(__dirname,"../images");


            form.multiples = true;
            form.maxFileSize = 50*1024*1024;
            form.uploadDir = uploadFolder;



            form.parse(req , async (err, fields, files) => {

                console.log(req);

                if(err){
                    console.log('error parsing files');
                    return cb.json({status:fail,message: 'errorparsing', error : err})
                }

            } );

            if(!files.file.length){
                const file = files.file
            }
            
            /*
            
                let multer = require('multer');
let upload = multer();

app.post('/save', upload.fields([]), (req, res) => {
  console.log( req.body );
  console.log( req.files );
  res.sendStatus(200);
});
            
            */

        });



  
     
        router.post('deleteFile', (data, cb) => {

            File.deleteOne({ id:data.id }, (err) => {
                if (err){
                    return cb({ success:false, message: err.message });
                }else{
                    return cb({ success:true, message: "File successfully deleted." });
                }
            });
        });









    return router;
};


