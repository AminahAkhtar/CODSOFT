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

// Serve resumes from the 'uploads' folder
app.use('/api/resumes', express.static(path.join(__dirname, 'middleware', 'uploads')));

//Available routes
// app.use('/api/auth', require('./routes/auth'))
// app.use('/api/home', require('./routes/home'))
app.use('/api/jobs', require('./routes/jobs'))
// app.use('/api/jobs/:jobId', require('./routes/jobs'))
app.use('/api/employer', require('./routes/employer'))
app.use('/api/candidate', require('./routes/candidate'))
app.use('/api/application', require('./routes/application'))
// app.use('/api/jobs/:jobId/apply', require('./routes/jobs'))
// app.use('/api/search', require('./routes/search'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})