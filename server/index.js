const express = require("express");
const mongoose = require("mongoose");
const port = process.env.PORT || 6969;
const postRouter = require("./routers/postRouter");
const profileRouter = require("./routers/profileRouter");

const uri =
  "mongodb+srv://admin:admin@twatter.j7drj.mongodb.net/Twatter?retryWrites=true&w=majority";
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const app = express();
    app.use(express.json());
    app.use("/api", postRouter);
    app.use("/api", profileRouter);

    app.listen(port, () =>
      console.log(`Server is running on http://localhost:${port}`)
    );
  });
