const Comment = require('../models/Comment');
const Post = require('../models/Post');

async function create(model) {
    const post = await Post.findById(model.postId);
    const comment = await Comment.create(model)
    post.comments.push(comment._id);
    return post.save();
}

async function update(commentId, model) {
    return await Comment.findByIdAndUpdate(commentId, model);
}

async function remove(commentId) {
    const comment = await Comment.findByIdAndRemove(commentId);
    const post = await Post.findById(model.postId);
    post.comments.remove(comment._id); 
    return post.save();
}

async function getById(commentId) {
    return Comment.findById(commentId);
}

module.exports = {
    create,
    update,
    remove,
    getById,
};