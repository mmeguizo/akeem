const User = require('../models/user'); // Import User Model Schema
const { v4: uuidv4 } = require('uuid');
const hash = require('../config/password-hasher');
let bcrypt = require('bcryptjs');


module.exports = (router) => {

    router.get('/getAllUser', (req, res) => {

        // Search database for all blog posts
        User.find({ deleted: false }, { _id: 1, email: 1, username: 1, role: 1, status: 1 }, (err, user) => {
            // Check if error was found or not
            if (err) {
                res.json({ success: false, message: err }); // Return error message
            } else {
                // Check if blogs were found in database
                if (!user) {
                    res.json({ success: false, message: 'No User found.' }); // Return error of no blogs found
                } else {
                    res.json({ success: true, user: user }); // Return success and blogs array
                }
            }
        }).sort({ '_id': -1 }); // Sort blogs from newest to oldest
    });




    router.post('/addUser', (req, res) => {

        if (!req.body.email) {
            res.json({ success: false, message: 'You must provide an email' })
        } else {

            if (!req.body.username) {
                res.json({ success: false, message: 'You must provide an username' })
            } else {
                if (!req.body.password) {
                    res.json({ success: false, message: 'You must provide an password' })

                } else if (req.body.password !== req.body.confirm) {

                    res.json({ success: false, message: 'Password dont match' })

                } else {

                    let user = new User({
                        id: uuidv4(),
                        email: req.body.email.toLowerCase(),
                        username: req.body.username.toLowerCase(),
                        password: req.body.password,
                        role: req.body.role.toLowerCase(),
                    })

                    user.save((err, data) => {
                        if (err) {
                            if (err.code === 11000) {

                                res.json({ success: false, message: 'User name or Email already exists ', err: err.message })
                            } else {

                                if (err.errors) {
                                    //for specific error email,username and password
                                    if (err.errors.email) {
                                        res.json({ success: false, message: err.errors.email.message })
                                    } else {
                                        if (err.errors.username) {
                                            res.json({ success: false, message: err.errors.username.message })
                                        } else {
                                            if (err.errors.password) {
                                                res.json({ success: false, message: err.errors.password.message })
                                            } else {
                                                res.json({ success: false, message: err })
                                            }
                                        }
                                    }

                                } else {
                                    res.json({ success: false, message: 'Could not save user Error : ' + err })
                                }
                            }
                        } else {
                            res.json({ success: true, message: 'Account Registered successfully', data: { email: data.email, username: data.username } });
                            // globalconnetion.emitter('user')
                        }
                    })

                }
            }
        }

    });


    router.put('/deleteUser', (req, res) => {

        let data = req.body;

        User.deleteOne({
            id: data.id
        }, (err, user) => {
                if (err) {
                    res.json({ success: false, message: 'Could not Delete User' + err })
                } else {
                    res.json({ success: true, message:' Successfully Deleted the User', data: user });
                    // globalconnetion.emitter('user')
                }
            })


    });

    router.put('/setInactiveUser', (req, res) => {

        let data = req.body;
        
        User.findOne({
            id: data.id
        }, (err, user) => {
            if(err) throw err
            User.findOneAndUpdate({ id: data.id }, { status: 'inactive' }, { upsert: true }, (err, response) => {
                    if (err) return res.json({ success: false, message: err.message });
                    if (response) {
                        res.json({ success: false, message: 'Could not set User to Inactive Status' + err })
                    } else {
                        res.json({ success: true, message:' Successfully User set to Inactive Status', data: user });
                    }
                });

            })
            
    });





    router.put('/updateUser', (req, res) =>   {

        let data = req.body;
        let userData = {};

     User.findOne({id: data.id }, async (err,docs) => {
         //check old password against the database
       
            if (err){
                res.json({ success: false, message: 'Error unable to Process Profile update: ' + err })
            }
            else{
                //if they change thier password
                if(data.changePassword){
                    
                    //compare passwords
                    let checkPassword = await bcrypt.compare(data.old_password, docs.password); 

                    if( !checkPassword){
                        res.json({ success: false, message: 'Old Password Incorrect: ' + !checkPassword })
                    }else{
                        
                        hash.encryptPassword(data.new_password).then(hash => {
                            userData.role = data.role;
                            userData.username = data.username;
                            userData.email = data.email;
                            userData.password = hash;
                            changedPassword = true;
                            User.findOneAndUpdate({ id: data.id }, userData, { upsert: true }, (err, response) => {
                                if (err) return res.json({ success: false, message: err.message });
                                if (response) {
                                    res.json({ success: true, message: "User Information has been updated!", data: response });
                                } else {
                                    res.json({ success: true, message: "No User has been modified!", data: response });
                                }
                            });
                        }).catch(err => { console.log(err); })

                    }
                }else{

                    userData.role = data.role;
                    userData.username = data.username;
                    userData.email = data.email;
                    userData.status = data.status;
                    User.findOneAndUpdate({ id: data.id }, userData, { upsert: true }, (err, response) => {
                        if (err) return res.json({ success: false, message: err.message });
                        if (response) {
                             res.json({ success: true, message: "User Information has been updated!", data: response  });
                        } else {
                            res.json({ success: true, message: "No User has been modified!", data: response });
                        }
                    });
                    
                }
            }
        })

    });


    router.get('/profile', (req, res) => {
        User.findOne({ id: req.decoded.userID }).select('username email').exec((err, user) => {
          if (err) {
            res.json({ success: false, message: err.message })
          } else {
            if (!user) {
              res.json({ success: false, message: 'User not found' })
            } else {
              res.json({ success: true, data: user })
            }
          }
        });
      });

    return router;
};


