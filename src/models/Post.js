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
    comments: { type: [ObjectId], default: [], ref: Comment },
    reactions: { type: [ObjectId], default: [], ref: Reaction },
    createdOn: { type: Date, default: Date.now },
});

schema.methods = {
    view: function () {
        var obj = this.toObject();

        obj.id = obj._id;

        obj.comments = obj.comments.map(c => {
            c.id = c._id;
            delete c._id, c.__v;
            c.reactions = c.reactions.map(r => {
                r.id = r._id;
                delete r._id, r.__v;
                return r;
            });

            return c;
        });
        obj.reactions = obj.reactions.map(r => {
            r.id = r._id;
            delete r._id, r.__v;
            return r;
        });

        delete obj._id, obj.__v;

        return obj;
    },
}

module.exports = model('Post', schema);