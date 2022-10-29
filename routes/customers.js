const Costumer = require('../models/customer'); // Import Costumer Model Schema
const { v4: uuidv4 } = require('uuid');
const hash = require('../config/password-hasher');
let bcrypt = require('bcryptjs');


module.exports = (router) => {

    router.get('/getAllCostumer', (req, res) => {

        // Search database for all blog posts
        Costumer.find({ deleted: false }, { _id: 1, email: 1, username: 1, role: 1, status: 1 }, (err, costumer) => {
            // Check if error was found or not
            if (err) {
                res.json({ success: false, message: err }); // Return error message
            } else {
                // Check if blogs were found in database
                if (!costumer) {
                    res.json({ success: false, message: 'No Costumer found.' }); // Return error of no blogs found
                } else {
                    res.json({ success: true, costumer: costumer }); // Return success and blogs array
                }
            }
        }).sort({ '_id': -1 }); // Sort blogs from newest to oldest
    });




    router.post('/addCostumer', (req, res) => {
        if (!req.body.email) {
            res.json({ success: false, message: 'You must provide an email' })
        } else {

            if (!req.body.name) {
                res.json({ success: false, message: 'You must provide an username' })
            } else {

                let costumer = new Costumer({
                    id: uuidv4(),
                    email: req.body.email.toLowerCase(),
                    name: req.body.name.toLowerCase(),
                    address: req.body.address.toLowerCase(),
                    attachment: req.body.attachment.toLowerCase(),
                    notes: req.body.notes.toLowerCase(),
                    company: req.body.company.toLowerCase(),
                    phone: req.body.phone,
                    open_balance: req.body.open_balance,
                })

                costumer.save((err, data) => {
                    if (err) {
                        if (err.code === 11000) {
                            res.json({ success: false, message: `${err.keyValue.email} already exists`, err: err.message })
                        } else {
                            if (err.errors) {
                                res.json({ success: false, message: 'Could not save costumer Error : ' + err })
                            }
                        }
                    } else {
                        res.json({ success: true, message: 'Customer added successfully', data: { email: data.email, name: data.name } });
                        // globalconnetion.emitter('costumer')
                    }
                })


            }
        }

    });


    router.put('/deleteCostumer', (req, res) => {

        let data = req.body;

        Costumer.deleteOne({
            id: data.id
        }, (err, costumer) => {
            if (err) {
                res.json({ success: false, message: 'Could not Delete Costumer' + err })
            } else {
                res.json({ success: true, message: ' Successfully Deleted the Costumer', data: costumer });
                // globalconnetion.emitter('costumer')
            }
        })


    });

    router.put('/changeCostumerStatus', (req, res) => {
        let data = req.body;
        Costumer.findOne({
            id: data.id
        }, (err, costumer) => {
            if (err) throw err
            Costumer.findOneAndUpdate({ id: data.id }, { status: data.status }, { upsert: true }, (error, response) => {
                if (error) return res.json({ success: false, message: error.message });
                if (response) {
                    res.json({ success: true, message: `Successfully Costumer set to ${data.status} Status`,  data: response });
                } else {
                    res.json({ success: false, message: `Could not set Costumer to ${data.status} Status` + response })
                }
            });

        })
    });




    router.put('/updateCostumer', (req, res) => {

        let data = req.body;
        let customerData = {};

        Costumer.findOne({ id: data.id }, async (err, docs) => {
            //check old password against the database

            if (err) {
                res.json({ success: false, message: 'Error unable to Process Profile update: ' + err })
            }
            else {
                customerData.email = data.email;
                customerData.name = data.name;
                customerData.address = data.address;
                customerData.company = data.company;
                customerData.phone = data.phone;
                customerData.open_balance = data.open_balance;
                customerData.notes = data.notes;
                customerData.status = data.status;
                Costumer.findOneAndUpdate({ id: data.id }, customerData, { upsert: true }, (err, response) => {
                    if (err) return res.json({ success: false, message: err.message });
                    if (response) {
                        res.json({ success: true, message: "Costumer Information has been updated!", data: response });
                    } else {
                        res.json({ success: true, message: "No Costumer has been modified!", data: response });
                    }
                });


            }
        })

    });


    router.get('/customer', (req, res) => {
        // Costumer.findOne({ id: req.decoded.customerId }).select('name email').exec((err, costumer) => {
        Costumer.findOne({ id: req.body.id }).select('name email').exec((err, costumer) => {
            if (err) {
                res.json({ success: false, message: err.message })
            } else {
                if (!costumer) {
                    res.json({ success: false, message: 'Costumer not found' })
                } else {
                    res.json({ success: true, data: costumer })
                }
            }
        });
    });

    return router;
};


