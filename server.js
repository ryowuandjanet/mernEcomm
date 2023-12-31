require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))

// Routes
app.use('/user', require('./routes/userRouter'))
app.use('/api', require('./routes/categoryRouter'))
app.use('/api', require('./routes/upload'))
app.use('/api', require('./routes/productRouter'))

// Connect to mongodb
const URI = process.env.MONGODB_URL

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, ).then((res) => {
  console.log('Connected to MongoDB');
}).catch( error => {
  console.log(error);
})

app.get('/',(req,res) => {
  res.json({msg: "Welcome my channel ,please subscribe for us. Thank"})
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>{
    console.log('Server is running on port', PORT)
})
