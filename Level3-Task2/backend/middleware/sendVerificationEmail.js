const transporter = require('../middleware/email'); // Import the email transport configuration
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Aminahisagoodgirl'
 
async function sendVerificationEmail(email, verificationToken) {

   // Generate a JWT token for email verification with an expiration time
   const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' }); // 1 hour expiration

  const mailOptions = {
    from: 'aminah30akhtar3a@gmail.com', // Replace with your Gmail email address
    to: email,
    subject: 'Email Verification',
    
    // text: `Click the following link to verify your email: http://localhost:5000/api/User/verify?token=${verificationToken}`,
    text: `Click the following link to verify your email: http://localhost:5000/api/User/verify?token=${token}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Verification email sent:', info.response);
  } catch (error) {
    console.error('Error sending verification email:', error);
  }
}

module.exports = sendVerificationEmail;
