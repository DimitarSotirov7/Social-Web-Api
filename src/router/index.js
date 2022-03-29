const router = require('express').Router();
const posts = require('./posts');
const comments = require('./comments');

router.use('/post', posts);
router.use('/comment', comments);

module.exports = router;