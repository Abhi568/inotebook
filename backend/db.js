const mongoose  = require('mongoose')

const URIString = 'mongodb://localhost:27017/iNoteBook'

const connectToLocalHost = ()=> {
    mongoose.connect(URIString,()=>{
        // if (err){
        //     console.log("Some Error while Connecting")
        //     return;
        // }
        console.log("connected to local host")
    })
}

module.exports = connectToLocalHost 