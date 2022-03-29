const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comments');

router.get('/all/:id', commentController.getAllByPostId);
router.get('/:id', commentController.getById);
router.post('/create', commentController.create);
router.post('/update/:id', commentController.update);
router.get('/remove/:id', commentController.remove);
router.get('/like/:id', commentController.like);
router.get('/dislike/:id', commentController.dislike);

module.exports = router