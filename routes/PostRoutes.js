var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Post = mongoose.model('Post');
var passport = require('passport');
var jwt = require('express-jwt');

var auth = jwt({
  secret: "This_IS_My_sEcReT_PhRASE",
  userProperty: 'payload'
});

router.get('/:id', function(req, res, next) {
  Post.findOne({_id: req.params.id}, function(err, result) {
    if(err) return next(err);
    if(!result) return next("Could not find that post");
    res.send(result);
  });
});

//Add data from create profile page to a particular User
router.put('/:id', auth,function(req,res,next){
  // console.log("made it to route file (for edit)");
  console.log(req.body);
  Post.update({_id: req.params.id},req.body,
  function(err,result){
    // console.log(req.body + "req.body");
    // console.log(req.params.id + "reqparams.id");
  if(err) return next(err);
  if(!result) return next("Could not create the object. Please check all fields.");
  // console.log(result);
  res.send(result);
});
});


router.delete('/:id', function(req,res,next){
  // console.log("I made it to the route file");
  Post.remove({_id: req.body.id}, function(err,result){
    if(err) return next(err);
  res.send();
});
});

//Add a new post. user must be logged in
router.post('/', auth, function(req, res, next) {
  console.log(req.body);
    var post = new Post(req.body);
    // post.save(function(err, result) {
      // if(err) return next(err);
      // if(!result) return next("Could not create the object. Please check all fields.");
      // result._createBy = req.payload.username;
      // User.update({result._createBy:req.payload.username},req.body, function(err,result){
      //
      // })
      // console.log(result);
      // res.send(result);
      User.findOne({username: req.payload.username}, function(err,result){
        if(err) return next(err);
    if(!result) return next({err: "Couldnt find a user with that id"});
    result.update({$push:{allPost: post}},
      function(err,result){
             if(err) return next(err);
             if(!result) return next({err: "Couldnt find a user with that id"});
          });
        post.save(function(err,result){
          if(err) return next(err);
        if(!result) return next({err: "Couldnt find a user with that id"});
        });
      // });
      res.send(result);

    });
    });
// });


//DISPLAY ALL POST ON EXPLORE PAGE
router.get('/', function(req,res,next){
  Post.find({})
  // .select('_avatar')
  .populate('._id','profilePic')
  .exec(function(err,result){
    if(err) return next(err);
    console.log(result);
    res.send(result);
  });
});
module.exports = router;
