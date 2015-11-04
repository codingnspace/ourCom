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

router.param('id', function(req,res,next,id){
  // console.log(id);
  User.findOne({_id: id}, function(err,result){
    if(err) return next(err);
    if(!result) return next({err: "couldnt find it"});
    req.user = result;
    next();
  });
});

//Add data from create profile page to a particular User
router.put('/:id', auth,function(req,res,next){
  // console.log("made it to route file (for edit)");
  console.log(req.body);
  User.update({_id: req.params.id},req.body,
  function(err,result){
    // console.log(req.body + "req.body");
    // console.log(req.params.id + "reqparams.id");
  if(err) return next(err);
  if(!result) return next("Could not create the object. Please check all fields.");
  // console.log(result);
  res.send(result);
});
});

//sending info on the new profile pic to server
router.put('/:id/pic', auth,function(req,res,next){
  console.log(req.body.url);
  User.update({_id: req.params.id},{
    profilePic: req.body.url,
  },
  function(err,result){
  if(err) return next(err);
  if(!result) return next("Could not create the object. Please check all fields.");
  console.log(result,"result");
  res.send(result);
});
});

router.put('/:id/bkpic', auth,function(req,res,next){
  console.log(req.body.url);
  User.update({_id: req.params.id},{
    backgroundPic: req.body.url,
  },
  function(err,result){
  if(err) return next(err);
  if(!result) return next("Could not create the object. Please check all fields.");
  console.log(result,"result");
  res.send(result);
});
});

router.post('/:id/comment', auth, function(req,res,next){
  console.log(req.body, "looking for comment body");
  var comment = {
    _commenter: req.payload.username,
    comment: req.body.Comments.body,
    };
    // console.log(req.params.id," req.params.id");
    // User
    // .findOne({_id: req.params.id},function(err,result)
    // req.user.comments.pic = user.profilePic;
    // console.log(req.payload._id);
    // var wat =req.payload._id;
    // User.findOne({wat : _id}, function(err,result){
    //   console.log(_id);
    //
    //   if(err) return next(err);
    //   if(!result) return next({err: "couldnt find it"});
    //   var son= result;
    //
    //   next();
    // });
    // comment.pic =req.newuser.profilePic;
 req.user.comments.push(comment);
 // console.log(req.book.reviews);
 // console.log(req.user , "req.user");

 req.user.save(function(err, result){
   res.send(req.user);
 });
});

// router.put('/:id/follow', auth,function(req,res,next){
//   User.update({_id: req.params.id},{
//     profilePic: req.body.url,
//   },
//   function(err,result){
//   if(err) return next(err);
//   if(!result) return next("Could not create the object. Please check all fields.");
//   console.log(result,"result");
//   res.send(result);
// });
// });

router.get('/:id/', auth,function(req,res,next){
  User
  .findOne({_id: req.params.id},
    function(err,result){
      if(err) return next(err);
      // console.log("I made it to the route file. about to send response");
      // console.log(req.user, "req.user");
      res.send(req.user);
      console.log("Sent response");
    });
});

router.post('/register', function(req, res, next) {
  var user = new User(req.body);
  user.setPassword(req.body.password);
  user.save(function(err, result) {
    if(err) return next(err);
    res.send(result.createToken());
  });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user) {
    if(err) return next(err);
    res.send(user.createToken());
  })(req, res, next);
});

module.exports = router;
