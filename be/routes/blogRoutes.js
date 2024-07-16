const express = require('express')
const router = express.Router()
const blogController = require('../controllers/blogController')

router.route('/')
    .get(blogController.getAllBlogs)
    .post(blogController.createNewBlog)

router.route('/:id')
    .get(blogController.getBlog)
    .put(blogController.updateBlog)
    .delete(blogController.deleteBlog)

module.exports = router