const express = require("express");
const server = express();
const port = 3004;


const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/start-timer");

server.use(express.urlencoded({extended:true}));
server.use(express.json());

const timerRoute = require("./routes/timerRoute");
const userRoute = require("./routes/userRoute");

server.use("/users", userRoute);

server.use("/", timerRoute);


server.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
