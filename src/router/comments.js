const express = require('express');
const router = express.Router();
const controller = require('../controllers/comments');

router.get('/:id', controller.getById);
router.post('/', controller.create);
router.patch('/', controller.update);
router.delete('/:id', controller.remove);
router.post('/reaction', controller.reaction);

module.exports = router