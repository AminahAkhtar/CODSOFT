// email.js
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const appPassword = 'kjkxeynaajfyxucz';
// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'aminah30akhtar3a@gmail.com', // Replace with your Gmail email address
    pass: appPassword, // Replace with your Gmail password (or use app-specific password)
  },
  tls: {
    rejectUnauthorized: false, // Allow self-signed certificates
  },
});

module.exports = transporter;
