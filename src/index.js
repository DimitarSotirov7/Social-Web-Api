require('dotenv').config()
const dbConnector = require('./config/database');
const app = require('express')();

dbConnector()
    .then(() => {
        require('./config/express')(app);
    })
    .catch(console.error);




























// const { createModel, addRefToModel } = require('./services/base');

// addCommentToPost('621e3d57daba79b891dc87fd', {
//     content: "Cool",
//     author: {
//         id: "afsdfgdsfdasfsdf",
//         name: "Nasko",
//     },
//     receiver: {
//         id: "fdsfdsrtsefdfs",
//         name: "Vasko",
//     }
// });

// const model = {
//     name: Post,
//     id: '621e3d57daba79b891dc87fd',
//     prop: 'comments'
// };
// const ref = {
//     name: Comment,
//     params: {
//         content: "Cool",
//         author: {
//             id: "afsdfgdsfdasfsdf",
//             name: "Nasko",
//         },
//         receiver: {
//             id: "fdsfdsrtsefdfs",
//             name: "Vasko",
//         }
//     }
// };
// addRefToModel(model, ref);

// createModel(Post, {
//     title: 'March 1st',
//     content: 'Happy',
//     author: {
//         id: 'asdasfdsfsdfsdf',
//         name: 'Someone'
//     },
//     receiver: {
//         id: 'sadfgdsfgsdfsdfd',
//         name: 'Someone2'
//     },
// });

// createModel(Post, {
//     title: 'March 1st',
//     content: 'Happy',
//     author: {
//         id: 'asdasfdsfsdfsdf',
//         name: 'Someone'
//     },
//     receiver: {
//         id: 'sadfgdsfgsdfsdfd',
//         name: 'Someone2'
//     },
// });

// const comment = await Comment.findById('621e355a98de5412337782e0');
// const post = await Post.findById('621e31b51b0d640ee09a117d');
// post.comments.push(comment);
// post.save();
// await Post.findByIdAndUpdate('621e31b51b0d640ee09a117d', { comments: Comment.create({
//     content: "Cool",
//     author: {
//         id: "afsdfgdsfdasfsdf",
//         name: "Nasko",
//     },
//     receiver: {
//         id: "fdsfdsrtsefdfs",
//         name: "Vasko",
//     },}) });

// const posts = await Post.findOne({}).populate('comments', 'content');
// console.log(posts);