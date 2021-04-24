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
    app.use(cors({
      'allowedHeaders': ['sessionId', 'Content-Type'],
      'exposedHeaders': ['sessionId'],
      'origin': '*',
      'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
      'preflightContinue': false
    }));
    app.use(express.json());
    app.use(
      cookieSession({
        name: "session",
        secret: "SuperSecretKey",
        secure: false,
        maxAge: 100000 * 10,
        httpOnly: true,
      })
    );
    /* app.use(function (req, res, next) {

      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  
      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', true);
  
      // Pass to next layer of middleware
      next();
  }); */
    app.set("trust proxy", 1);
    
    app.use("/api", sessionRouter);
    app.use("/api", postRouter);
    app.use("/api", profileRouter);

    app.listen(port, () =>
      console.log(`Server is running on http://localhost:${port}`)
    );
  });
