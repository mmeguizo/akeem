
let bcrypt = require('bcryptjs');

module.exports.checkPassword = function (password) {





    return new Promise((resolve, reject) => {

        bcrypt.compare(password, hash, function(err, result) {
            // result == true
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, function (err, hash) {
                if (err) reject(err);
                else {
                    resolve(hash);
                }
            });
        });
    })
}

bcrypt.compare(req.body.password, user.password, function(err, res) {
    if (err){
      // handle error
    }
    if (res) {
      // Send JWT
    } else {
      // response is OutgoingMessage object that server response http request
      return response.json({success: false, message: 'passwords do not match'});
    }
  });