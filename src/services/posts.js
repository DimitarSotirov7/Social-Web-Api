const Post = require('../models/Post');
const Comment = require('../models/Comment');
const reactionService = require('../services/reaction');

async function create(post) {
    return await Post.create(post);
}

async function update(params) {
    return await Post.findByIdAndUpdate(params.id, params);
}

async function remove(postId) {
    const post = Post.findById(postId);
    post.comments?.foreach(cId => {
        Comment.findByIdAndRemove(cId);
    });
    return await Post.findByIdAndRemove(postId);
}

async function getAll() {
    return Post.find({}).populate('comments').populate('reactions');
}

async function getById(postId) {
    return Post.findById(postId).populate('comments');
}

async function getAllByAuthor(authorId) {
    return Post.find({author: { id: authorId }}).populate('comments');
}

async function reaction(model) {
    var reaction = await reactionService.getByPostAndAuthor(model.postId, model.authorId);
    const post = await Post.findById(model.postId);
    if (reaction) {
        const result = await reactionService.change(reaction, model);
        if (result) {
            post.reactions.remove(result._id); 
            return post.save();
        }
        return result;
    } else {
        reaction = await reactionService.create(model)
        const post = await Post.findById(model.postId);
        post.reactions.push(reaction._id);
        return post.save();
    }
    
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