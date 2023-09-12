const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
 const {isEmail} = require('validator');

const userschema = mongoose.Schema({
    username : {
        type : String,
        required: [true , "Please enter the username"]
    },
    email : {
        type : String,
        required : [true , "please add the email"],
        unique : [true , "that email is already registered" ],
        validate : [isEmail,"enter proper email"]
    },
    password:{
        type :String,
        required : [true , "please enter the password"]
    }
})

userschema.pre('save' , async function(next){
     const salt = await bcrypt.genSalt();
     this.password = await bcrypt.hash(this.password , salt);
})

module.exports = mongoose.model("user",userschema);