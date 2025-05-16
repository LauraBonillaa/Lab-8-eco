const supabaseCli = require("../services/supabase.service");

const getAllOrders = async () => {
  const { data, error } = await supabaseCli.from("Orders").select();
  if (error) {
    console.error(error);
    return error;
  }
  return data;
};

const createOrderInDB = async (order) => {
  const { data, error } = await supabaseCli
    .from("Orders")
    .insert([order])
    .select();

  if (error) {
    console.error(error);
    return error;
  }

  return data;
};

const updateOrderInDb = async (newData, orderId) => {
  const { data, error } = await supabaseCli
    .from("Orders")
    .update(newData)
    .eq("id", orderId)
    .select();

  if (error) {
    console.error(error);
  }

  return data;
};

const deleteOrderInDb = async (orderId) => {
  const { data, error } = await supabaseCli
    .from("Orders")
    .delete()
    .eq("id", orderId)
    .select();

  if (error) {
    console.error(error);
  }

  return data;
};

module.exports = {
  getAllOrders,
  createOrderInDB,
  updateOrderInDb,
  deleteOrderInDb,
}; 