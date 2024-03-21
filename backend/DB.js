const sql = require('mssql');
const config = require('./config');

async function connectToDatabase() {
    console.log("in connectToDatabase in DB");

    try {
        // Establish a connection to the database
        await sql.connect(config);
        console.log('Connected to the database successfully');
        
        // Execute queries or operations here
    } catch (err) {
        console.error('Failed to connect to the database', err);
    }
}

module.exports = connectToDatabase;
