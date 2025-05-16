const express = require("express");
const { getPostsLike, getPosts } = require("../controllers/posts.controller");
const router = express.Router();

router.get("/posts", getPosts);
router.get("/posts/like", getPostsLike);

module.exports = router; 