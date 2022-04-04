const Reaction = require('../models/Reaction');

const commentService = require('./comments');
const postService = require('./posts');

async function react(model) {
    var reaction = await Reaction.findOne({ postId: model.postId, authorId: model.authorId });
    const post = await postService.getById(model.postId);
    if (reaction) {
        const result = await change(reaction, model);
        if (result) {
            post.reactions.remove(result._id); 
            return post.save();
        }
        return result;
    } else {
        reaction = await Reaction.create(model);
        post.reactions.push(reaction._id);
        return post.save();
    }
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
    react,
    change,
    remove,
};