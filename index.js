require('dotenv').config()
const express = require('express');
const cors = require('cors')
const app = express();
const router = express.Router();
const config = require('./config/database');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const path = require('path');
const http = require('http').Server(app);


//path routes
//onst customer = require('./routes/customers')(router);
const authentication = require('./routes/authentication')(router);
const customer = require('./routes/customers')(router);
const users = require('./routes/users')(router);

mongoose.Promise = global.Promise;

mongoose.connect(config.uri, config.options, (err) => {
    if (err) {
        console.log('cant connect to database ' + process.env.DB_NAME);
    } else {
        console.log('connected to the database ' + process.env.DB_NAME);
    }
});


app.use(cors())

//body-parser built in express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//for deployment on hosting and build
app.use(express.static(__dirname + 'dist'));
app.use('/images', express.static(path.join(__dirname, './images')));
app.use('/upload', express.static(path.join(__dirname, './upload')));


//api routes
//app.use('/customer', customer);
app.use('/authentication', authentication);
app.use('/customer', customer);
app.use('/users', users);


app.get('*', (req, res) => {
    //  res.send('<h1>Hello from the Server Side</h1>')
    res.sendFile(path.join(__dirname + '/dist/index.html'),)
});


const servers = app.listen(PORT|| 52847, () => {
    console.log('Connected on port ' + PORT );
});

