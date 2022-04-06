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
        await remove(reaction._id);
        return { reaction, deleted: true };
    }

    reaction.emoji = model.emoji;
    reaction.modifiedOn = Date.now();
    reaction.save();
    return { reaction };
}

module.exports = {
    getByPostAndAuthor,
    getByCommentAndAuthor,
    create,
    change,
    remove,
    getById,
};