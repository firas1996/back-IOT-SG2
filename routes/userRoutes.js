const express = require("express");
const {
  createUser,
  updateUser,
  getUser,
  getUsers,
  deleteUser,
} = require("../controllers/userController");

const Routes = express.Router();

Routes.route("/").post(createUser);
Routes.route("/:id").patch(updateUser);
Routes.route("/:id").get(getUser);
Routes.route("/").get(getUsers);
Routes.route("/:id").delete(deleteUser);

module.exports = Routes;
