const fs = require('fs')
const rfs = require('rotating-file-stream')
const path = require('path')


const logDirectory = path.join(__dirname, '../production_logs')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

const accessLogStream = rfs.createStream('access.log',{
  interval:'1d',
  path:logDirectory
})


const development = {
  name:'development',
  asset_path:'./assets',
  session_cookie_key:'iamironman',
  //db:"sociali_devlopment",
  db :"mongodb+srv://social-i_app:9102764714@cluster0.ujvmk.mongodb.net/FirstDatabase?retryWrites=true&w=majority",
  smtp:{
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:'ethanhuntvikash910@gmail.com',
        pass:'vikash@786',
    }
  },
  google_client_id:"441461649858-l4p8536udqhrnqkul9qrrrhml7n71o6d.apps.googleusercontent.com",
  google_client_secret:"XcbH-U_b130ISzzBTKIx6vaX",
  google_callback_url:"http://localhost:8000/users/auth/google/callback",
  jwt_secret:'code',
  morgan:{
    mode:'dev',
    options:{stream:accessLogStream}
  }
}

const production = {
    name:'production',
    asset_path:process.env.SOCIALI_ASSET_PATH,
    session_cookie_key:'iamironman',
   // db:"sociali_production",
    db :"mongodb+srv://social-i_app:9102764714@cluster0.ujvmk.mongodb.net/FirstDatabase?retryWrites=true&w=majority",
    // db:'sociali_production',
    smtp:{
      service:'gmail',
      host:'smtp.gmail.com',
      port:587,
      secure:false,
      auth:{
          user:process.env.SOCIALI_GMAIL_USERNAME,
          pass:process.env.SOCIALI_GMAIL_PASSWORD
      }
    },
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    google_client_secret:process.env.GOOGLE_CLIENT_SECRET,
    google_callback_url:process.env.GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.SOCIALI_JWT_SECRET,
    morgan:{
      mode:'combined',
      options:{stream:accessLogStream}
    }
}


module.exports = eval(process.env.SOCIALI_ENVIRONMENT) == undefined ? development : eval(process.env.SOCIALI_ENVIRONMENT)