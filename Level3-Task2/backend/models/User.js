const mongoose = require('mongoose')

const {Schema} = mongoose
const UserSchema = new Schema({
    firstName:{
        type:String,
        required: true
    },
    lastName:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required: true
    },
    cpassword:{
        type:String,
        required: true 
    },
    projectsAssigned: [{
         type: mongoose.Schema.Types.ObjectId, 
         ref: 'Project' 
    }],
    accountVerified: {
        type: Boolean,
        default: false,
    },
    role:{
        type:String,
        required: true 
    },
    date:{
        type:Date,
        default: Date.now
    },
});

const User = mongoose.model('user', UserSchema );
module.exports =  User;