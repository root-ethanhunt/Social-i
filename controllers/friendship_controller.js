const Friendship = require('../models/friendship')
const User = require('../models/user')


module.exports.toggleFollow = async function(req,res){
    try{
        
        let addable
        let deleted = false

        addable = await (await User.findById(req.query.id)).populated('friendships')

        let existingFollow = await Friendship.findOne({
            from_user:req.user._id,
            to_user:req.query.id
        })

        if(existingFollow){
           addable.friendships.pull(existingFollow._id)
           addable.save()

           existingFollow.remove()
           deleted = true;
        }
        else{
             let newFallow = await Friendship.create({
                from_user:req.user._id,
                to_user:req.query.id
             })

             addable.friendship.push(newFallow._id)
             addable.save()
        }

        return res.json(200, {
            message: "Request successful!",
            data: {
                deleted: deleted
            }
        })

    }catch(err){
        console.log(err)
        return res.json(500,{
            message:'Internal Server Error'
        })
    }
}