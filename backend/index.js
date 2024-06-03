const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors'); 
require('dotenv').config()

connectToMongo();
const app = express()
const port = 3002

app.use(cors());

app.use(express.json())
app.use('/api/auth', require('./Routes/auth'))

app.listen(port||3000, () => {
  console.log(`backend listening at http://localhost:${port}`)
})