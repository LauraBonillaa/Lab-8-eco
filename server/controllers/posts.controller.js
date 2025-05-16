const { getPostsByTitleLike, getAllPosts } = require("../db/posts.db");

const getPostsLike = async (req, res) => {
  const { word } = req.query;
  const posts = await getPostsByTitleLike(word || "");
  res.send(posts);
};

const getPosts = async (req, res) => {
  const posts = await getAllPosts();
  res.send(posts);
};

module.exports = {
  getPostsLike,
  getPosts,
}; 