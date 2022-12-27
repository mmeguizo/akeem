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
    

        router.post('/addFile', async (req, res) => {
                // create an incoming form object
  var form = new formidable.IncomingForm();

  form.maxFileSize = 2500 * 1024 * 1024;
  form.multiples = true;

  form.uploadDir = path.join(__dirname, '..', 'images/files')

  form.on('file', function(field, file) {
     fs.rename(file.filepath, path.join(form.uploadDir, file.newFilename), () => {
         let  uploadData =  new  File( {
            id: uuidv4(),
            source: file.newFilename,
            for : 'files'
            });
            uploadData.save(  (err, data) => {
                console.log(err);
                console.log(data);
            } )
     });
  });

  form.on('progress', (bytesReceived, bytesExpected) => {
  });

  process.on('uncaughtException', function(err) {  //this does nothing
     console.log(err)
     throw err;
  })

  form.on('error', function(err) {
     console.log('An error has occured: \n' + err);
     res.eventEmitter('error')
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
     console.log("finished uploading")
  });

  // parse the incoming request containing the form data
// form.parse(req);

    form.parse(req, async (err, fields, files) => {
        let returnMe = []

      returnMe.push([fields, files]);

if (err) {
    next(err);
    return;
}
return  await res.json({ success: true, message: 'Files uploaded successfully ', data:returnMe });
    })
            // var form = new formidable.IncomingForm();
            // form.multiples = true;
            // form.uploadDir = path.join(__dirname, '..', 'images')
            // // form.uploadDir = `${__dirname}/../images/files`;
            // form.parse(req);
            
            // form.on('fileBegin', function (name, file){
            //     file.path = path.join(__dirname, '..', 'images')
            //     console.log( file);

            //     fs.rename(file.path, path.join(form.uploadDir,  file.newFileName), (err) => {
            //         console.log(err);
            //     });

            // });
            
        
            // form.on('file', function (name, file){
            //     console.log('Uploaded ' + file.newFileName);
            // });
        
            // return res.status(200).json({result: 'Upload Success'});

            
            // let useFor = 'files';
            // let username = 'tester';
            // let formidable = require('formidable');
            // let fs = require('fs');
            // let path = require('path');
            // let md5 = require('md5');
            // var form = new formidable.IncomingForm();
            //  form.uploadDir = `${__dirname}/../images/files`;
            //  form.multiples = true;
            // await form.on('file', async (field, file) => {
              

            //   //  file.path = path.join(__dirname, '..', 'images/files')
            //     console.log(file);

            //     if ( await fs.existsSync(file.filepath)) {
            //                     await fs.rename(file.filepath, path.join(form.uploadDir, file.originalFilename), async (err) => {
            //                         if (err) {
            //                             console.log(err);
            //                         // return res.json({ success:false, message:err.name + " " + err.message }) 
            //                         }else{
            //                                 let  uploadData =  new  File( {
            //                                     id: uuidv4(),
            //                                     source: file.newFileName,
            //                                     for : 'files'
            //                                 });
            //                                 await uploadData.save(  (err, data) => {
            //                                     if(err){
            //                                     // res.json({ success: false, message: 'Error, could not save files : ' + err })
            //                                         }
            //                                 } )
            //                             }
            //             });
            //     }else{
            //       console.log('err');
            //     }
            //  }) ;
            //   form.on('error', function(err) {
            //     console.log('An error has occured: \n' + err);
            //   });
            //   form.on('end', function() {
            //     // console.log('hey');
            //   });
            //   form.parse(req, async (err, fields, files) => {
            //     if (err) {
            //       next(err);
            //       return;
            //     }
            //     return  await res.json({ success: true, message: 'Files uploaded successfully ', data:{ fields, files} });
            //   });

        });


        router.post('/addAvatar', (req, res) => {

            console.log('addAvatar kicks in');
            console.log(req.body);
            
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


