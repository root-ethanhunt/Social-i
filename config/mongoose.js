const mongoose = require('mongoose')
const env = require('./environment') 

//const url =`mongodb://127.0.0.1:27017/${env.db}`
const url = env.db

mongoose.connect(url,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true,useFindAndModify:true})

const db = mongoose.connection

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;