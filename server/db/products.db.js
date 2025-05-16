const supabaseCli = require("../services/supabase.service");

const getAllProducts = async () => {
  const { data, error } = await supabaseCli.from("Products").select();
  if (error) {
    console.error(error);
    return error;
  }
  return data;
};

const getProductsByUserId = async (user_id) => {
  const { data, error } = await supabaseCli
    .from("Products")
    .select()
    .eq("user_id", user_id);
  if (error) {
    console.error(error);
    return error;
  }
  return data;
};

module.exports = {
  getAllProducts,
  getProductsByUserId,
}; 