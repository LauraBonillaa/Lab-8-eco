const supabaseCli = require("../services/supabase.service");

const getPostsByTitleLike = async (word) => {
  const { data, error } = await supabaseCli
    .from("posts")
    .select()
    .ilike("title", `%${word}%`);
  if (error) {
    console.error(error);
    return error;
  }
  return data;
};

const getAllPosts = async () => {
  const { data, error } = await supabaseCli.from("posts").select();
  if (error) {
    console.error(error);
    return error;
  }
  return data;
};

module.exports = {
  getPostsByTitleLike,
  getAllPosts,
}; 