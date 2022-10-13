let mongoose = require('mongoose');
const User = require('../models/user'); // Import User Model Schema
const { v4: uuidv4 } = require('uuid');
const hash = require('../config/password-hasher')



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



        let data = req.body


        User.updateOne({
            _id: data._id
        },
            {
                $set: { deleted: true }

            }, (err, user) => {
                if (err) {
                    res.json({ success: false, message: 'Could not Delete User' + err })
                } else {
                    res.json({ success: true, message: data.username + ' Successfully Deleted the User', data: user });
                    // globalconnetion.emitter('user')
                }
            })


    });




    router.put('/updateUser', (req, res) => {




        let data = {
            "_id": mongoose.Types.ObjectId("63482c0882453f90d8c1d97b"),
            "id": "9487847e-1e85-4764-bcc8-b9bae030292e",
            "email": "tester@tester.com",
            "username": "tester",
            "role": "admin",
            "status": "active",
            "deleted": false,
            "password": "Password123!",
            "__v": 0
        }


        let userData = {};
        let changedPassword = false;

      let results = User.findOne({id: "9487847e-1e85-4764-bcc8-b9bae030292e" },  (err,docs) => {
            if (err){
                console.log(err)
            }
            else{
                console.log('================');
                console.log("Result : ", docs);
            }
        }).lean();

        console.log('================');
        console.log(results);



        // if (data.password || data.confirm !== '') {
        //     hash.encryptPassword(data.password).then(hash => {
        //         console.log({ hash_resolve: hash });
        //         userData.role = data.role;
        //         userData.username = data.username;
        //         userData.email = data.email;
        //         userData.password = hash;
        //         changedPassword = true;
        //         User.findOneAndUpdate({ _id: data._id }, userData, { upsert: true }, (err, response) => {
        //             if (err) return res.json({ success: false, message: err.message });
        //             if (response) {
        //                 res.json({ success: true, message: "User Information has been updated!", data: response, changedPassword: changedPassword });
        //             } else {
        //                 res.json({ success: true, message: "No User has been modified!", data: response });
        //             }
        //         });
        //     }).catch(err => { console.log(err); })
        // } else {
        //     userData.role = data.role;
        //     userData.username = data.username;
        //     userData.email = data.email;
        //     changedPassword = false
        //     User.findOneAndUpdate({ _id: data._id }, userData, { upsert: true }, (err, response) => {
        //         if (err) return res.json({ success: false, message: err.message });
        //         if (response) {
        //             res.json({ success: true, message: "User Information has been updated!", data: response, changedPassword: changedPassword });
        //         } else {
        //             res.json({ success: true, message: "No User has been modified!", data: response });
        //         }
        //     });
        // }

        console.log(userData);
    });












    return router;
};


