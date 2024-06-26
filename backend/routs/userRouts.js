const express = require('express');
const router = express.Router();
const userServer = require('../service/userServer');

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
        let result = await userServer.getUserInformation(req.params.id);
        res.send(result); 
    }
    catch (e) {
        console.error("the error is: " + e);
        res.status(500).send({ error: "An error occurred while get the user." });
    }
});

router.post('/', async (req, res) => {
    try {
        let result =   await userServer.addUser(req.body);
        res.send(result);
    }
    catch (e) {
        console.error("the error is: " + e);
        res.status(500).send({ error: "An error occurred while adding the user." });
    }
});

router.put('/:id', async (req, res) => {
    const userId = req.params.id;
    const userData = req.body;
    try {
        let result = await userServer.updateUser(userId, userData);
        res.send(result);
    } catch (e) {
        console.error("The error is: " + e);
        res.status(500).send({ error: "An error occurred while updating the user." });
    }
});

router.delete('/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        await userServer.deleteUser(userId);
        res.send({ message: "User deleted successfully." });
    } catch (e) {
        console.error("The error is: " + e);
        res.status(500).send({ error: "An error occurred while deleting the user." });
    }
});

module.exports = router;