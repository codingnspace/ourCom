var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
  username: {lowercase: true, unique: true, required: true, type: String},
  email: {lowercase: true, unique: true, required: true, type: String},
  salt: String,
  passwordHash: String,
  name: String,
  kind: String,
  profilePic: String,
  bio: String,
  address: String,
  city: String,
  state:String,
  gender:  String,
  reviews: Array,
  allPost: Array,
  tags: Array,
  backgroundPic: String,
  comments:  [{
    _commenter: String,
    pic: String,
    comment: String,
    postedOn: Date,
    rating: Number,
  }],
  favs: Array,
  following: Array,
  followers: Array,
  prestige: Number,
  rating: Number,
  messages: [{
    message: String,
    to: String,
    by: String,
    sent: Date,
  }],
  birthday: Date,
  established: Date,
  events: Array,
  needs: Array,
  offers: Array,
  twitter: String,
  facebook: String,
  tumblr: String,
});

UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.checkPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return (hash === this.passwordHash);
};

UserSchema.methods.createToken = function() {
  return jwt.sign({
    _id: this._id,
    username: this.username,
    email: this.email
  }, "This_IS_My_sEcReT_PhRASE");
};

mongoose.model('User', UserSchema);
