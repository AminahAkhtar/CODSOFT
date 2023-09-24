const express = require('express');
const Candidate = require('../models/Candidate');
const router = express.Router();
const bcrypt = require('bcryptjs')
const {body, validationResult} = require('express-validator')

var jwt = require('jsonwebtoken')
var fetchuser = require('../middleware/fetchuser')
const JWT_SECRET = 'Aminahisagoodgirl'



//create a user using: POST "/api/auth/createuser" No login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({min:3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password','Password must be atleast 5 characters').isLength({min:5}),
], async (req,res) => {
  let success=false;
    // if there are errors return bad request
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({success, errors:errors.array()});
  }

  //check whether same email exist
try{


  let user = await Candidate.findOne({email: req.body.email});
  if (user) {
    return res.status(400).json({success,error :"Email already exists"})
  }

  const salt = await bcrypt.genSalt(10);
  const secPass = await  bcrypt.hash(req.body.password,salt);
  //create new user
  user = await Candidate.create({
    name:req.body.name,
    password: secPass,
    email: req.body.email,


})

const data = {
  user:{
    id:user.id
  }
}

const authtoken = jwt.sign(data, JWT_SECRET);
success =true;
res.json({success, authtoken})

}catch(error){
    console.log(error.message);
    res.status(500).send("Internal server error");

}
})




//authenticate a user using: POST "/api/auth/login" No login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req,res) => {
   // if there are errors return bad request
   const errors = validationResult(req);
   if(!errors.isEmpty()){
     return res.status(400).json({errors:errors.array()});
   }

   const {email,password} = req.body;
   try {
     let user = await Candidate.findOne({email});
     if(!user){
      return res.status(400).json({error:"Please login with correct credentials"});
     }


     const passwordCompare = await bcrypt.compare(password, user.password);
     if(!passwordCompare){
      success= false
      return res.status(400).json({success, error:"Please login with correct credentials"});
     }

     const data = {
      user:{
        id:user.id
      }
    }
    
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true
    res.json({success, authtoken})
    
   } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
   }
 

})



//get logged in user details using: POST "/api/auth/getuser" login required
router.post('/getuser', fetchuser, async (req,res) => {
try {
  userId = req.user.id;
  const user = await Candidate.findById(userId).select("-password")
  res.send(user)
} catch (error) {
  console.log(error.message);
  res.status(500).send("Internal server error");
}

})
const getCandidateEmailFromDatabase = require('../utils/getCandidateEmailFromDatabase'); // Import the function to fetch candidate's email
router.get('/getEmail', fetchuser, async (req, res) => {
  try {
    const userId = req.user.id; // Get the user's ID from the authenticated token
    const candidateEmail = await getCandidateEmailFromDatabase(userId);
    
    res.json({ email: candidateEmail });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }

});
module.exports = router