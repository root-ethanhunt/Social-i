const Friendship = require('../models/friendship')
const User = require('../models/user')


module.exports.toggleFollow = async function(req,res){
    try{

        // Follow/toggle/?=abcd

        let removed = false
        let user1 = await User.findById(req.query.id).populate('friendships')
        let user2 = await User.findById(req.user._id).populate('friendships')



        let existingFriend1 = await Friendship.findOne({
            from_user : req.user._id,
            to_user : req.query.id
        }) 

        let existingFriend2 = await Friendship.findOne({
            from_user : req.query.id,
            to_user :  req.user._id
        }) 
        


        if(existingFriend1){
          user2.friendships.pull(req.query.id)
          user1.friendships.pull(req.user._id)

          user2.save()
          user1.save()
          removed = true

          existingFriend1.remove()
        }
        else if(existingFriend2){
            user2.friendships.pull(req.query.id)
            user1.friendships.pull(req.user._id)
  
            user2.save()
            user1.save()
            removed = true
  
            existingFriend2.remove()
           
        }
        else{

            let newFriend = await Friendship.create({
                from_user : req.user._id,
                to_user : req.query.id
            }) 
             
            user2.friendships.push(req.query.id)
            user1.friendships.push(req.user._id)

           user2.save()
           user1.save()
        }



        return res.json(200,{
          message:"friendship toggled",
          data:{
            deleted:removed
          }
        })

    }catch(err){
        console.log(err)
        return res.json(500,{
            message:'Internal Server Error'
        })
    }
}