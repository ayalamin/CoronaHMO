const router = express.Router();
const userServer = require('../service/userServer');


// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

  router.get('/', async (req, res) => {
    try {
        let result = await userServer.getAllUser();
        res.send(result); 
    }
    catch (e) {
        console.error("the error is: " + e);
    }
});

router.get('/:id', async (req, res) => {
    try {
        let result = await userServer.getUserInformation(req.params);
        res.send(result); 
    }
    catch (e) {
        console.error("the error is: " + e);
    }
});
module.exports = router;