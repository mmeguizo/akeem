
require('dotenv').config()
const crypto = require('crypto');


// Node.js program to demonstrate the    
// crypto.createHmac() method
 
// Includes crypto module
 
// Defining key
const secret = 'meguizo';
 
// Calling createHmac method
const hash = crypto.createHmac('sha256', secret)
                    
                   // updating data
                   .update('akeem')
 
                   // Encoding to be used
                   .digest('hex');
 




// const hash = crypto.createHmac(process.env.ENCRYPTION_ALGO, process.env.ENCRYPTION_KEY).update('Akeem').digest(process.env.ENCRYPTION_ENCODING);

module.exports = {

    uri: process.env.DB_URL,
    // uri: process.env.DB_LOCAL,
    secret: hash,
    options: {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },

}