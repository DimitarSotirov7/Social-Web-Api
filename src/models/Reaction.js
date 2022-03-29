const { Schema, model } = require('mongoose');

const schema = new Schema({
    like: { type: Boolean },
    dislike: { type: Boolean },
    heart: { type: Boolean },
    laugh: { type: Boolean },
    angry: { type: Boolean },
    authorId: { type: String, required: true },
    postId: { type: String },
    commentId: { type: String },
    createdOn: { type: Date, default: Date.now },
});

schema.methods = {
    view: function() {
        var obj = this.toObject();
    
        // obj.id = obj._id;
        delete obj._id, obj.__v, obj.authorId, obj.postId, obj.createdOn;
        return obj;
    },
}

module.exports = model('Reaction', schema);