const Reaction = require('../models/Reaction');

async function getByPostAndAuthor(postId, authorId) {
    return await Reaction.findOne({ postId, authorId });
}

async function getByCommentAndAuthor(commentId, authorId) {
    return await Reaction.findOne({ commentId, authorId });
}

async function getById(reactionId) {
    return await Reaction.findById(reactionId);
}

async function create(model) {
    return await Reaction.create(model);
}

async function remove(reactionId) {
    return await Reaction.findByIdAndRemove(reactionId);
}

async function change(reaction, model) {
    if (reaction.emoji === model.emoji) {
        return await remove(reaction._id);
    }

    reaction.emoji = model.emoji;
    reaction.modifiedOn = Date.now();
    reaction.save();
    return;
}

module.exports = {
    getByPostAndAuthor,
    getByCommentAndAuthor,
    create,
    change,
    remove,
    getById,
};