const { Schema, model, Types: { ObjectId } } = require('mongoose');
const Reaction = require('./Reaction');
const { comments } = require('../common/errorMessages.json');

const schema = new Schema({
    content: { type: String, required: true, minlength: [4, comments.content.length] },
    imageUrl: { type: String, default: '' },
    author: { type: { id: { type: String, required: true }, name: { type: String, default: 'Anonymous' } }, required: true },
    postId: { type: String, required: true },
    reactions: { type: [ ObjectId ], default: [], ref: Reaction },
    createdOn: { type: Date, default: Date.now },
});

schema.methods = {
    view: function() {
        var obj = this.toObject();
    
        obj.id = obj._id;

        obj.reactions = obj.reactions.map(r => {
            r.id = r._id;
            delete r._id, r.__v;
            return r;
        });
        
        delete obj._id, obj.__v;
    
        return obj;
    },
}

module.exports = model('Comment', schema);