const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");


router
  .route("/")

  .get(userController.listAllUsers)
  .put(userController.updateUser)
  .delete(userController.deleteUser)


  .post(userController.createAUser);

module.exports = router;
