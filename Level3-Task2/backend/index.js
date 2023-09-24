const connectToMongo = require('./db');
const express = require('express')
const cors = require('cors');
const path = require('path');
connectToMongo();

const app = express()
const port = 5000

// Use cors middleware to allow requests from specified origins
app.use(cors({
  origin: 'http://localhost:3000', // Replace with the URL of your frontend
  credentials: true, // Set to true if you want to allow cookies and other credentials
}));

app.use(express.json())


//Available routes
app.use('/api/User', require('./routes/User'))
app.use('/api/Project', require('./routes/Project'))
app.use('/api/Task', require('./routes/Task'))




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})