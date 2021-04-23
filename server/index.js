const express = require("express");
const mongoose = require("mongoose");
const port = process.env.PORT || 6969;
const postRouter = require("./routers/postRouter");
const profileRouter = require("./routers/profileRouter");
const sessionRouter = require("./routers/sessionRouter");
const cookieSession = require("cookie-session");
const cors = require("cors");

const uri =
  "mongodb+srv://admin:admin@twatter.j7drj.mongodb.net/Twatter?retryWrites=true&w=majority";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    const app = express();
    app.use(express.json());
    app.set("trust proxy", 1);
    app.use(
      cookieSession({
        name: "session",
        secret: "SuperSecretKey",
        secure: false,
        maxAge: 100000 * 10,
        httpOnly: true,
      })
    );


    app.use(cors());
    app.use("/api", sessionRouter);
    app.use("/api", postRouter);
    app.use("/api", profileRouter);

    app.listen(port, () =>
      console.log(`Server is running on http://localhost:${port}`)
    );
  });
