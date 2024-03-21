const express = require('express');
const bodyParser = require('body-parser');
const userRouts = require('./routs/userRouts')
const app = express();
const port = 3000; 

console.log("in index");

const cors = require('cors');
const corsOptions = {
    origin: '*',
    credentials: true,         
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// app.use(bodyParser.json());
app.use('/api/user', userRouts);

// Connect to database then start the server
try {
  app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
  });
} catch (error) {
  console.error('Error occurred while starting the server:', error);
}