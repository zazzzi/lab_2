const express = require('express');
const app = express();
const port = process.env.PORT || 6969;

// console.log that your server is up and running
app.listen(port, () => console.log(`Server is running on http://localhost:${port}/express_backend`));

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});
