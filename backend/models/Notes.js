const mongoose  = require('mongoose') 
const { Schema } = mongoose;

const notesSchema = new Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'users'
  },
  title:{
    type:String,
    require:true
  },
  description:{
    type:String,
    require:"Need to Do :-)"
  },
  date:{
    type:Date,
    default:Date.now
  },
  tag:{
    type:String,
    default:"General"
  }
});

module.exports = mongoose.model('notes', notesSchema);