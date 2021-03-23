const express = require('express')
const app = express()
const port = 8000

// use express router
app.use('/',require('./routes'))

// set up the view engine
app.set('view engine','ejs')
app.set('views','./views')


app.listen(port,()=>{
    console.log(`Server is running on port : ${port}`)
}) 