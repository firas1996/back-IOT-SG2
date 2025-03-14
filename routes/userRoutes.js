const express = require("express");
const {
  createUser,
  updateUser,
  getUser,
  getUsers,
  deleteUser,
  signup,
  signIn,
  prottectorMW,
} = require("../controllers/userController");

const Routes = express.Router();

Routes.route("/signup").post(signup);
Routes.route("/signin").post(signIn);
Routes.route("/").post(createUser);
Routes.route("/:id").patch(updateUser);
Routes.route("/:id").get(getUser);
Routes.route("/").get([prottectorMW, getUsers]);
Routes.route("/:id").delete(deleteUser);

module.exports = Routes;
