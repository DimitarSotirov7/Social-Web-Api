const Reaction = require('../models/Reaction');

async function getByPostAndAuthor(postId, authorId) {
    return await Reaction.findOne({ postId, authorId });
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
    reaction.save();
    return;
}

module.exports = {
    getByPostAndAuthor,
    create,
    change,
    remove,
};