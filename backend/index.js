const connectToLocalHost = require('./db')

const express = require('express')
const app = express()
const port = 5000
var cors = require('cors')

app.use(cors())

app.use(express.json())

//linking the route 
// app.get('/',(req,res)=>{
//   res.send("yes")
//   console.log(req.body,res)
// })
app.use('/api/notes', require('./routes/notes'))
app.use('/api/auth', require('./routes/auth'))

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`)
})
connectToLocalHost();