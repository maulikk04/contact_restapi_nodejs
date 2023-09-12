const mongoose = require('mongoose');

const uri= "mongodb+srv://maulikkansara04:J0DYfbhA55lETBI7@cluster0.xfaznku.mongodb.net/Cluster0?retryWrites=true&w=majority"

const connectdb = ()=>{
    mongoose.connect(uri , {useNewUrlParser : true , useUnifiedTopology : true});
    console.log('connected to db');
}

module.exports = connectdb;