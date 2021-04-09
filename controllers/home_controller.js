const Post = require('../models/post')
const User = require('../models/user')
const Like = require('../models/like')
const Friendship = require('../models/friendship')

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

    let friends = new Array()
    let f= await Friendship.find({})

   if(req.user){
    let friend = await User.findById(req.user._id)
    
    for(var i= 0;i<friend.friendships.length;i++){
      let check = await User.findById(friend.friendships[i])
     
     // console.log(check)
       friends.push(check)
      
    }

  
  
   }
   
   
    
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
         all_users:users,
         friends:friends

     })

   }catch(err){
  
      console.log('Error',err)
      return
   }
 
   
}