const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
const { Schema } = mongoose;


const userSchema = new Schema({

    email: { type: String, required: true, unique: true, lowercase: true},
    username: { type: String, required: true, unique: true, lowercase: true },
    role: { type: String, required: true },
    status: { type: String, default: 'active' },
    deleted: { type: Boolean, default: false },
    password: { type: String, required: true,  }
  
  });

  
module.exports = mongoose.model('User', userSchema);