
require('dotenv').config()
const crypto = require('crypto');


const hash = crypto.createHmac('sha256', 'MEGUIZO').update('meguizo_starter').digest('hex');

module.exports = {


    uri: 'mongodb://localhost:27017/akeem',
    secret: hash,
    options: {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },

}