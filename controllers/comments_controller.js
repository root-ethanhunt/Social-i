const Comment = require("../models/comment");
const Post = require("../models/post");
const commentMailer = require("../mailers/comments_mailer");
const Like = require("../models/like");
const User = require("../models/user");

module.exports.create = async function (req, res) {
  try {
    let post = await Post.findById(req.body.post);

    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });
      post.comments.push(comment);
      post.save();

      comment = await comment.populate("user", "name email").execPopulate;
      // commentMailer.newComment(comment)
      //console.log(comment.user.name)

      if (req.xhr) {
        // Similar for comments to fetch the user's id!
        // comment = await comment.populate('user', 'name').execPopulate()

        return res.status(200).json({
          data: {
            comment: comment,
          },
          message: "Post created!",
        });
      }

      req.flash("success", "Comment created");

      return res.redirect("/");
    }
  } catch (err) {
    console.log("Error", err);
    return;
  }
};

module.exports.destroy = async function (req, res) {
  try {
    let comment = await Comment.findById(req.params.id);
    // console.log(req.params.id)
    //console.log(comment.post)
    if (comment.user == req.user.id) {
      // console.log(req.user.id)
      let postId = comment.post;

      comment.remove();

      let post = Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });

      // CHANGE :: destroy the associated likes for this comment
      await Like.deleteMany({ likeable: comment._id, onModel: "Comment" });

      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment_id: req.params.id,
          },
          message: "comment deleted",
        });
      }

      req.flash("success", "Comment deleted!");

      return res.redirect("back");
    } else {
      req.flash("error", "Unauthorized");
      return res.redirect("back");
    }
  } catch (err) {
    console.log("Error", err);
    req.flash("Error", err);
    return;
  }
};
