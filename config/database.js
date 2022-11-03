
require('dotenv').config()
const crypto = require('crypto');


const hash = crypto.createHmac(process.env.ENCRYPTION_ALGO, process.env.ENCRYPTION_KEY).update('Akeem').digest(process.env.ENCRYPTION_ENCODING);

module.exports = {

    uri: process.env.DB_URL,
    // uri: process.env.DB_LOCAL,
    secret: hash,
    options: {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },

}