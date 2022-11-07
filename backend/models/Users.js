const mongoose = require('mongoose');
const { Schema } = mongoose;

const usersSchema = new Schema({
  name:{
    type:String,
    require:true
  },
  emailID:{
    type:String,
    require:true,
    unique:true
  },
  password:{
    type:String,
    require:true
  },
  date:{
    type:Date,
    default:Date.now
  }
});

module.exports = mongoose.model('users', usersSchema);