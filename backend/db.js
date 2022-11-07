const mongoose  = require('mongoose')

const URIString = 'mongodb://localhost:27017/iNoteBook'

const connectToLocalHost = ()=> {
    mongoose.connect(URIString,()=>{
        console.log("connected to local host")
    })
}

module.exports = connectToLocalHost 