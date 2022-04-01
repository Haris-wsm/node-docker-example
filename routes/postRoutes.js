const router = require('express').Router();

const postController = require('../controller/postController');
const { protect } = require('../middleware/authMiddleware');

router
  .route('/')
  .get(protect, postController.getAllPost)
  .post(protect, postController.createPost);

router
  .route('/:id')
  .get(postController.getOnePost)
  .patch(postController.updatePost)
  .delete(postController.deletePost);

module.exports = router;
