const {
  getAllUsers,
} = require("../db/users.db");

const getUsers = async (req, res) => {
  const users = await getAllUsers();
  res.send(users);
};

module.exports = {
  getUsers,
};
