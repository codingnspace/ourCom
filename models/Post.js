var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    title: String,
    body: String,
    kind: String,
    photo1: String,
    photo2: String,
    photo3: String,
    vidUrl: String,
    host: String,
    location: String,
    // tags: Array,
    _createBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    deleted: Date,
    postedOn: Date,
    comments: [{
      _commenter: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        body: String,
        postedOn: Date,
        votes: Number,
      }],
   date: Date,
   startTime: Date,
   endTime: Date,
   price: String,
   _sharedBy:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
   _favedBy: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
   _avatar:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
   _atendees: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
});

mongoose.model('Post', PostSchema);
