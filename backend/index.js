const express = require('express');
const bodyParser = require('body-parser');
const userRouts = require('./routs/userRouts')
const connectToDatabase = require('./DB');

const app = express();
const port = 3000; 

console.log("in index");


app.use(bodyParser.json());
app.use('/api/user', userRouts);

// Connect to database then start the server
connectToDatabase().then(() => {
  app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
  });
}).catch(err => {
  console.error("Failed to connect to the database", err);
  process.exit(1);
});

