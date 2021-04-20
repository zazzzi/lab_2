const express = require("express");
const mongoose = require("mongoose");
const port = process.env.PORT || 6969;
const routes = require("./routes");

const uri =
  "mongodb+srv://admin:admin@twatter.j7drj.mongodb.net/Twatter?retryWrites=true&w=majority";
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const app = express();
    app.use(express.json());
    app.use("/api", routes);

    app.listen(port, () =>
      console.log(`Server is running on http://localhost:${port}`)
    );
  });
