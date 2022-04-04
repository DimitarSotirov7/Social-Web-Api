const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comments');

router.get('/:id', commentController.getById);
router.post('/', commentController.create);
router.patch('/', commentController.update);
router.delete('/:id', commentController.remove);

module.exports = router