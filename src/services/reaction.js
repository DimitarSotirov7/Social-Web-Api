const Reaction = require('../models/Reaction');

const Comment = require('../models/Comment');
const Post = require('../models/Post');

async function getByPostAndAuthor(postId, authorId) {
    return await Reaction.findOne({ postId, authorId });
}

async function getByCommentAndAuthor(commentId, authorId) {
    return await Reaction.findOne({ commentId, authorId });
}

async function getByCommentId(commentId) {
    return await Reaction.find({ commentId });
}

async function getByPostId(postId) {
    return await Reaction.find({ postId });
}

async function getById(reactionId) {
    return await Reaction.findById(reactionId);
}

async function create(model) {
    return await Reaction.create(model);
}

async function remove(reactionId) {
    const reaction = await Reaction.findByIdAndRemove(reactionId);

    const post = (await Post.find())
        .filter(p => p.reactions.filter(c => c._id === reaction._id))[0];
    post?.reactions.remove(reaction._id); 
    post.save();

    const comment = (await Comment.find())
        .filter(p => p.reactions.filter(c => c._id === reaction._id))[0];
    comment?.reactions.remove(reaction._id); 
    comment.save();

    return { id: reaction._id, emoji: reaction.emoji, isDeleted: true };
}

async function change(reaction, model) {
    if (reaction.emoji === model.emoji) {
        return await remove(reaction._id);
    }

    reaction.emoji = model.emoji;
    reaction.modifiedOn = Date.now();
    reaction.save();
    return reaction;
}

module.exports = {
    getByPostAndAuthor,
    getByCommentAndAuthor,
    create,
    change,
    remove,
    getById,
    getByCommentId,
    getByPostId,
};