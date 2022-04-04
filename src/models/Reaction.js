const { Schema, model } = require('mongoose');

const schema = new Schema({
    authorId: { type: String, required: true },
    postId: { type: String },
    commentId: { type: String },
    createdOn: { type: Date, default: Date.now },
    modifiedOn: { type: Date, default: undefined },
    emoji: { type: String, required: true }, //like, dislike, heart, laugh, angry
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