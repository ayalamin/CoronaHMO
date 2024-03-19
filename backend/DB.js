const sql = require('mssql');
const config = require('./config');



async function main() {
    try {
        // Connect to the database
        await sql.connect(config);
        const result = await sql.query`SELECT * FROM Members`;
        console.log(result);
    } catch (err) {
        console.error('Failed to connect to the database:', err);
    }
}

main();