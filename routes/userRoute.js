const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

const jwtMiddleware = require("../middleware/jwtMiddleware");

router
  .route("/login").post(userController.userLogin);

  
router
  .route("/register")
  .post(userController.createAUser);

router
  .route("/:user_id")
  .all(jwtMiddleware.verifyToken)
  .put(userController.updateUser)
  .delete(userController.deleteUser);



module.exports = router;
