const express = require("express");
const router = express.Router();

const timerController = require("../controller/timerController");


router
  .route("/posts/:user_id/timer")
  
  .post(timerController.createATimes);

router.route("/alltimes")
.get(timerController.listAllTimes);

module.exports = router;
