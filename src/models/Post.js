const { Schema, model, Types: { ObjectId } } = require('mongoose');
const Comment = require('./Comment');
const Reaction = require('./Reaction');
const { posts } = require('../common/errorMessages.json');

const schema = new Schema({
    title: { type: String, required: true, minlength: [4, posts.title.length] },
    content: { type: String, required: true, minlength: [4, posts.content.length] },
    imageUrl: { type: String, default: '' },
    author: { type: { id: { type: String, required: true }, name: { type: String, default: 'Anonymous' } }, required: true },
    receiverId: { type: String },
    comments: { type: [ ObjectId ], default: [], ref: Comment },
    reactions: { type: [ ObjectId ], default: [], ref: Reaction },
    createdOn: { type: Date, default: Date.now },
});

// schema.index({ title: 1 }, {
//     collation: {
//         locale: 'en',
//         strength: 1
//     }
// });

schema.methods = {
    view: function() {
        var obj = this.toObject();
    
        obj.id = obj._id;
        delete obj._id, obj.__v;
    
        return obj;
    },
    isLiked: function () {
        return this.likes > this.dislikes
    },
}

module.exports = model('Post', schema);