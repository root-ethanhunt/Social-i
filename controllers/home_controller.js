const Post = require('../models/post')
const User = require('../models/user')
//const Like = require('../models/like')

module.exports.home = async function(req,res){
   // res.cookie('user_id',25)

//    Post.find({},function(err,posts){
//     return res.render('home',{
//         title: "Home",
//         posts: posts
//     })
//    }) 


   

   try{
    //populate the user of each post

     
      let posts = await Post.find({})
      .sort('-createdAt')
      .populate('user')
      .populate({
         path:'comments',
         populate:{
            path:'user'
         },
         populate :{
            path:'likes'
         }
      }) .populate('comments')
      .populate('likes')
      
      let users = await User.find({})
        
      return res.render('home',{
         title: "Home",
         posts: posts,
         all_users:users
     })

   }catch(err){
  
      console.log('Error',err)
      return
   }
 
   
}