const express = require('express')
const app = express()
const cors = require("cors");
app.use((req, res, next) => {
  res.cc = function(err, status = 1) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err
    });
  };
  next();
});
app.use(cors());
const userRouter = require("./router/user.js");
const workRouter = require("./router/index.js");
app.use("/api", userRouter);
app.use("/my", workRouter);
app.listen(5000, () => {
  console.log("api server running at http://127.0.0.1:5000");
});
