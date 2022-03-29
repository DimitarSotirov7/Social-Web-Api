const Comment = require('../models/Comment');
const Post = require('../models/Post');

async function create(comment) {
    return await Comment.create(comment);
}

async function update(commentId, params) {
    return await Comment.findByIdAndUpdate(commentId, params);
}

async function remove(commentId) {
    return await Comment.findByIdAndRemove(commentId);
}

async function getById(commentId) {
    return Comment.findById(commentId);
}

async function getAllByPostId(postId) {
    const post = Post.findById(postId).populate('comments');
    if (!post.comments) {
        return [];
    }
    console.log(post.comments)
    return Comment.find({ _id: (post.comments).filter(x => x === _id)._id });
}

async function like(commentId) {
    const comment = Comment.findById(commentId);
    post.like++;
    post.save();
}

async function dislike(commentId) {
    const comment = Comment.findById(commentId);
    post.dislike++;
    post.save();
}

module.exports = {
    create,
    update,
    remove,
    getById,
    getAllByPostId,
    like,
    dislike,
};