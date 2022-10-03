
require('dotenv').config()
const crypto = require('crypto');


const hash = crypto.createHmac(process.env.ENCRYPTION_ALGO, process.env.ENCRYPTION_KEY).update('akeem_starter').digest(process.env.ENCRYPTION_ENCODING);

module.exports = {


    uri: 'mongodb://localhost:27017/akeem',
    secret: hash,
    options: {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },

}