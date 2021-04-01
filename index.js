const express = require('express')
const cookieParser = require('cookie-parser')
//const bodyParser = require('body-parser');
const app = express()
const port = 8000
const expressLayouts = require('express-ejs-layouts')
const db = require('./config/mongoose')

// used for session cookie
const session = require('express-session')
const passport = require('passport')
const passportLocal = require('./config/passport-local-strategy')
const passportJwt = require('./config/passport-jwt-strategy')

// we can also use connect-mongo-session module to avoid error
// i am using v3 module for connect-mongo
const MongoStore = require('connect-mongo')(session)
const sassMiddleware = require('node-sass-middleware')
const flash = require('connect-flash')
const customMware = require('./config/middleware')


app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}))


app.use(express.urlencoded())

app.use(cookieParser())

 

app.use(express.static('./assets'))
// make the uploads path available to the browser
app.use('/uploads',express.static(__dirname + '/uploads'))

app.use(expressLayouts)
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);





// set up the view engine
app.set('view engine','ejs')
app.set('views','./views')


//mongo store is used to store the session cookie in the db

app.use(session({
    name:'social-i',
    secret:'iamironman',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: new MongoStore({
            mongooseConnection:db,
            autoRemove: 'disabled'
    },
    function(err){
        console.log(err || 'connect-mongodb setup ok')
    }
    )
}))

app.use(passport.initialize())
app.use(passport.session())


app.use(passport.setAuthenticatedUser)

app.use(flash())
app.use(customMware.setFlash)

// use express router
app.use('/',require('./routes'))

 
app.listen(port,()=>{
    console.log(`Server is running on port : ${port}`)
}) 