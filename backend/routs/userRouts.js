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
        console.log("in gett after send , the params is: "+ req.params.id);
        let result = await userServer.getUserInformation(req.params.id);

        res.send(result); 
        console.log("in gett after send");
    }
    catch (e) {
        console.error("the error is: " + e);
        res.status(500).send({ error: "An error occurred while get the user." });

    }
});


router.get('/vaccines/count/:id', async (req, res) => {
    try {
        console.log("in get in vacciens, the id is: "+ req.params.id);
        let result = await userServer.getCountVaccines(req.params.id);
        res.send(result); 
        console.log("in gett after send");
    }
    catch (e) {
        console.error("the error is: " + e);
        res.status(500).send({ error: "An error occurred while get the user." });

    }
});

router.get('/vaccines/how', async (req, res) => {
    try {
        console.log("in unvaccinated");
        console.log("The id received is:");
        let result = await userServer.getCountUnVaccines(); 
        res.send(result); 
        console.log("in unvaccinated after send");
    }
    catch (e) {
        console.error("the error is: " + e);
        res.status(500).send({ error: "An error occurred while get the user." });
    }
});

router.get('/count', async (req, res) => {
    try {
        console.log("in month");
        console.log("The id received is:");
        let result = await userServer.getMonth(); 
        res.send(result); 
        console.log("in unvaccinated after send");
    }
    catch (e) {
        console.error("the error is: " + e);
        res.status(500).send({ error: "An error occurred while get the user." });
    }
});

router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        console.log("in userRouts-post "+ req.body.LastName);
        let result =   await userServer.addUser(req.body);
        res.send(result);
    }
    catch (e) {
        console.error("the error is: " + e);
        res.status(500).send({ error: "An error occurred while adding the user." });

    }
});

router.post('/vaccines', async (req, res) => {
    try {
        console.log("in userRouts-post "+ req.body.MemberID);
        let result =   await userServer.addVaccine(req.body);
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
    console.log(`Updating user ${userId} with data:`, userData);
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
    console.log(`Deleting user ${userId}`);
    try {
        let result = await userServer.deleteUser(userId);
        res.send({ message: "User deleted successfully." });
    } catch (e) {
        console.error("The error is: " + e);
        res.status(500).send({ error: "An error occurred while deleting the user." });
    }
});

module.exports = router;