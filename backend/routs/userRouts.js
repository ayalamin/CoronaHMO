const express = require('express');
const router = express.Router();
const userServer = require('../service/userServer');

router.get('/', async (req, res) => {
    try{
        let result = await userServer.getAllUser();
        console.log(result)
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