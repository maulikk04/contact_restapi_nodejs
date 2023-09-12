const express = require('express');
const routes= require('./routes/router');
const userroutes = require('./routes/userroutes')

const app = express();
const connect = require('./db/connect');


app.use(express.json()); 
app.use('/api/contacts' , routes)
app.use('/api/user' , userroutes)

const start = ()=>{
    connect();
    app.listen(5000 , ()=>{
        console.log("started..")
    })
}

start();