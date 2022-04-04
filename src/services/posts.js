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

function changeReaction(reaction, model) {
    const modelKey = Object.entries(model).filter(([ k, v ]) => v === true)[0][0];
    if (reaction[modelKey]) {
        throw new Error('There is already a reaction from this user to this post');
    }

    reaction.like = reaction.like ? undefined : reaction.like
    reaction.dislike = reaction.dislike ? undefined : reaction.dislike
    reaction.laugh = reaction.laugh ? undefined : reaction.laugh
    reaction.heart = reaction.heart ? undefined : reaction.heart
    reaction.angry = reaction.angry ? undefined : reaction.angry
    
    reaction[modelKey] = true;
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