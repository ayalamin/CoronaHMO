const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000; 
const userRouts = require('./routs/userRouts')

app.use(bodyParser.json());

app.use('/api/user', userRouts);



// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});