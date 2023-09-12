const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "user"
    },
    name : {
        type : String,
        required : [true , "Please enter name"]
    },
    email : {
        type : String,
        required : [true , "Please enter email"]
    },
    phone : {
        type : String,
        required : [true , "Please enter phone number"]
    }
})

module.exports = mongoose.model('contact' , schema);