const User = require('../models/user')
const Friendship = require('../models/friendship')
const fs = require('fs')
const path = require('path')

module.exports.profile = async function(req,res){
    // User.findById(req.params.id,function(err,user){
    //     return res.render('user_profile',{
    //         title:'User Profile',
    //         profile_user:user
    //     })
    // })


    try{
      let  user = await User.findById(req.params.id)
          
      let already_friend = false
      let type1 = await Friendship.find({
        to_user: req.params.id,
        from_user: req.user._id
    })


    let type2 = await Friendship.find({
        to_user: req.user._id,
        from_user: req.params.id
    })

    // if(type1 || type2){
    //     already_friend = true
    // }

    if (type1.length != 0 || type2.length != 0) {
        already_friend = true;
    }
     


        return res.render('user_profile',{
            title:'User Profile',
            profile_user:user,
            already_friend:already_friend
        })
       }
       catch(err){
           console.log(err)
           return 
       }
       
 
}


module.exports.update = async function(req,res){
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
    //          req.flash('success','Updated!')
    //         return res.redirect('back')
    //     })
    // }
    // else{
    //       req.flash('error','Unauthorized')
    //     return res.status(401).send('Unauthorized')
    // }

    if(req.user.id == req.params.id){

        try{
            let user = await User.findById(req.params.id)
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('****Multer Error',err)

                }
                user.name = req.body.name
                user.email = req.body.email

                if(req.file){

                    // if(user.avatar){
                    //     fs.unlinkSync(path.join(__dirname,'..',user.avatar))
                    // }


                    //this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename

                }
                user.save()
                return res.redirect('back')
               
            })

        }
        catch(err){
            req.flash('error',err)
            return res.redirect('back')
        }
    }
    else{
        req.flash('error','Unauthorized')
        return res.status(401).send('Unauthorized')
    }
}


//render the sign up page
module.exports.signUp = function(req,res){
   if(req.isAuthenticated()){
     return  res.redirect('/users/profile')
   }

    return res.render('user_sign_up',{
        title:"Social-i | Sign Up"
    })
}

//render the sign in page
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
      return  res.redirect('/users/profile')
    }

    return res.render('user_sign_in',{
        title:"Social-i | Sign In"
    })
}


// get the sign up data
module.exports.create = function(req,res){
  if(req.body.password != req.body.confirm_password){
      return res.redirect('back')
  }
  
  User.findOne({email: req.body.email},(err,user)=>{
        if(err){
            console.log('error in finding user in signing up')
            return
        }

        if(!user){
            User.create(req.body,(err,user)=>{
                if(err){
                    console.log('error in creating user while signing up')
                    return
                }

                return res.redirect('/users/sign-in')
            })
        }
        else{
            return res.redirect('back')
        }
  })

}


// sign in and create a session for the user
module.exports.createSession = function(req,res){
    req.flash('success','Logged in Successfully')
    return res.redirect('/')
}


module.exports.destroySession = function(req,res){
    req.logout()
    req.flash('success','You have logged out')


    return res.redirect('/')
}