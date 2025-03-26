const express = require('express');


const {
  newPost,
  getPosts,
  getSinglePost,
  updatePost,
  deletePost
} = require('../controllers/blogController'); // Import controller

const router = express.Router();

router.route('/blog').get(getPosts).post(newPost);
router.route('/blog/:slug').get(getSinglePost);
router.route('/blog/:id').put(updatePost).delete(deletePost);

module.exports = router;
