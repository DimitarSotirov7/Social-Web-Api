const Comment = require('../models/Comment');
const Post = require('../models/Post');
const reactionService = require('../services/reaction');

async function create(model) {
    const post = await Post.findById(model.postId);
    const comment = await Comment.create(model)
    post.comments.push(comment._id);
    post.save();
    return comment.populate('reactions');
}

async function update(model) {
    const comment = await Comment.findByIdAndUpdate(model.id, model);
    return await Comment.findById(comment._id);
}

async function remove(commentId) {
    const comment = await Comment.findByIdAndRemove(commentId);

    const posts = await Post.find();
    const post = posts.filter(p => p.comments.filter(c => c._id === comment._id))[0];
    post.comments.remove(comment._id); 
    post.save();

    const reactions = await reactionService.getByCommentId(comment._id);
    if (reactions) {
        reactions.map(async r => await reactionService.remove(r._id));
    }

    return { id: comment._id, content: comment.content, isDeleted: true };
}

async function getById(commentId) {
    return Comment.findById(commentId);
}

async function reaction(model) {
    var reaction = await reactionService.getByCommentAndAuthor(model.commentId, model.authorId);
    const comment = await Comment.findById(model.commentId);
    if (reaction) {
        return await reactionService.change(reaction, model);
    } else {
        reaction = await reactionService.create(model)
        comment.reactions.push(reaction._id);
        comment.save();
        return reaction;
    }
}

async function getReactions(commentId) {
    return await Comment.findById(commentId);
}

module.exports = {
    create,
    update,
    remove,
    getById,
    reaction,
    getReactions,
};