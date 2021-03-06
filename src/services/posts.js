const Post = require('../models/Post');
const Comment = require('../models/Comment');
const reactionService = require('../services/reaction');

async function create(post) {
    return await Post.create(post);
}

async function update(params) {
    await Post.findByIdAndUpdate(params.id, params);
    return await Post.findById(params.id).populate({
        path: 'comments',
        populate: 'reactions',
    }).populate('reactions');
}

async function remove(postId) {
    const post = Post.findById(postId);
    post.comments?.foreach(cId => {
        Comment.findByIdAndRemove(cId);
    });
    post.reactions?.foreach(rId => {
        reactionService.remove(rId);
    });
    const deletedPost = await Post.findByIdAndRemove(postId);
    return deletedPost._id;
}

async function getAll() {
    return await Post.find({}).populate({
        path: 'comments',
        populate: 'reactions',
    }).populate('reactions');
}

async function getById(postId) {
    return Post.findById(postId).populate('comments').populate('reactions');
}

async function getAllByAuthor(authorId) {
    return Post.find({ author: { id: authorId } }).populate('comments');
}

async function reaction(model) {
    var reaction = await reactionService.getByPostAndAuthor(model.postId, model.authorId);
    const post = await Post.findById(model.postId);
    if (reaction) {
        return await reactionService.change(reaction, model);
    } else {
        reaction = await reactionService.create(model)
        post.reactions.push(reaction._id);
        post.save();
    }
    return reaction;
}

module.exports = {
    create,
    update,
    remove,
    getAll,
    getById,
    getAllByAuthor,
    reaction,
};