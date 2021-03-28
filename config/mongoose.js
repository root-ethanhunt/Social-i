const mongoose = require('mongoose')

const url = "mongodb+srv://social-i_app:9102764714@cluster0.ujvmk.mongodb.net/FirstDatabase?retryWrites=true&w=majority"

mongoose.connect(url,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true,useFindAndModify:true})

const db = mongoose.connection

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;