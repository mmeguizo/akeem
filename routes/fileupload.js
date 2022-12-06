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
            
            let useFor = data.body.useFor;
            let username = data.body.auth.username;
            let formidable = require('formidable');
            let fs = require('fs');
            let path = require('path');
            let md5 = require('md5');

            var form = new formidable.IncomingForm();
             form.uploadDir = `${__dirname}/../uploads/images/`;
             form.on('file', async (field, file) => {
                 
                 let newFileName = [
                    username,
                     Math.random(),
                     Math.random(),
                     Math.random(),
                ];

                newFileName = `${md5(newFileName.join(''))}.${file.name.split('.').pop()}`;

                    if (fs.existsSync(file.path)) {
                        fs.rename(file.path, path.join(form.uploadDir, newFileName), (err) => {
                            if (err) {
                                return res.json({ success:false, message:err.name + " " + err.message }) 
                            }else{

                                let uploadData = new File( {
                                    id: uuidv4(),
                                    source: newFileName,
                                    for : 'customer-files'
                                });

                                console.log(newFileName);

                              
                            }
                        });
                    }else{
                        return res.json({ success:false, message: "Something went wrong please re-upload your image." }) 
                    }
             });

              form.on('error', function(err) {
                console.log('An error has occured: \n' + err);
              });
              form.on('end', function() {
                // console.log('hey');
              });
              form.parse(data);

        });


        router.post('/addAvatar', (req, res) => {
            
            let useFor = req.body.useFor;
            let username = 'tester';
            let formidable = require('formidable');
            let fs = require('fs');
            let path = require('path');
            let md5 = require('md5');

            var form = new formidable.IncomingForm();
             form.uploadDir = `${__dirname}/../images/`;
             form.on('file', async (field, file) => {
                 
                 let newFileName = [
                    username,
                     Math.random(),
                     Math.random(),
                     Math.random(),
                ];

             newFileName = `${md5(newFileName.join(''))}.${( (file.originalFilename )).split('.').pop()}`;

                    if (fs.existsSync(file.filepath)) {
                        fs.rename(file.filepath, path.join(form.uploadDir, newFileName), (err) => {
                            if (err) {
                                return res.json({ success:false, message:err.name + " " + err.message }) 
                            }else{

                                let uploadData = new File( {
                                    id: uuidv4(),
                                    source: newFileName,
                                    for : 'avatar'
                                });

                                uploadData.save( (err, data) => {

                                    if(err){
                                    res.json({ success: false, message: 'Error, could not save avatar : ' + err })
                                    }else{
                                        res.json({ success: true, message: 'Avatar uploaded successfully ', data:data });

                                    }
                                } )
                            }
                        });
                    }else{
                        return res.json({ success:false, message: "Something went wrong please re-upload your image." }) 
                    }
             });

              form.on('error', function(err) {
                console.log('An error has occured: \n' + err);
              });
              form.on('end', function() {
                // console.log('hey');
              });
              form.parse(req);
        });



  
     
        router.post('deleteFile', (data, res) => {

            File.deleteOne({ id:data.id }, (err) => {
                if (err){
                    return res.json({ success:false, message: err.message });
                }else{
                    return res.json({ success:true, message: "File successfully deleted." });
                }
            });
        });









    return router;
};


