const express = require('express');
const router = express.Router();
const vaccinationServer = require('../service/vaccinationServer');

router.post('/', async (req, res) => {
    try {
        let result =   await vaccinationServer.addVaccine(req.body);
        res.send(result);
    }
    catch (e) {
        console.error("the error is: " + e);
        res.status(500).send({ error: "An error occurred while adding the user." });
    }
});

router.get('/count/:id', async (req, res) => {
    try {
        let result = await vaccinationServer.getCountVaccines(req.params.id);
        res.send(result); 
    }
    catch (e) {
        console.error("the error is: " + e);
        res.status(500).send({ error: "An error occurred while get the user." });
    }
});

router.get('/how', async (req, res) => {
    try {
        let result = await vaccinationServer.getCountUnVaccines(); 
        res.send(result); 
    }
    catch (e) {
        console.error("the error is: " + e);
        res.status(500).send({ error: "An error occurred while get the user." });
    }
});

router.get('/month', async (req, res) => {
    try {
        let result = await vaccinationServer.getMonth(); 
        res.send(result); 
    }
    catch (e) {
        console.error("the error is: " + e);
        res.status(500).send({ error: "An error occurred while get the user." });
    }
});

module.exports = router;