const sql = require('../DB');

async function addVaccine(vaccineData) {
    try {
        const { MemberID, DateReceived, Manufacturer } = vaccineData;
        const formattedBirthDate = new Date(DateReceived).toISOString().slice(0, 10);
        const query = `
            INSERT INTO CoronaHMO.Vaccinations (MemberID, DateReceived, Manufacturer) 
            VALUES ('${MemberID}',  
            '${formattedBirthDate}', '${Manufacturer}')
        `;
        const result = await sql.query(query);
        return result;
    } catch (err) {
        console.error('Error adding vaccine', err);
        throw err;
    }
}

async function getCountVaccines(pas) {
    try {
        const result = await sql.query(`
        SELECT COUNT(*) AS VaccineCount
        FROM CoronaHMO.Vaccinations
        WHERE MemberID = '${pas}';
         `);
        return result;
    } catch (err) {
        console.error('Error fetching users', err);
        throw err;
    }
}

async function getCountUnVaccines() {
    console.log("in getCountVaccines in userServer")
    try {
        const result = await sql.query(`
        SELECT COUNT(*) AS count
        FROM CoronaHMO.Members
        WHERE MemberID NOT IN (SELECT DISTINCT MemberID FROM CoronaHMO.Vaccinations);
         `);
        return result;
    } catch (err) {
        console.error('Error fetching users', err);
        throw err;
    }
}

async function getMonth() {
    try {
        const result = await sql.query(`
        SELECT DATE_FORMAT(DateOfAttachment, '%Y-%m-%d') AS day, COUNT(*) AS active_patients
        FROM CoronaHMO.CovidCases
        WHERE DateOfAttachment BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 MONTH) AND CURDATE()
        GROUP BY DATE(DateOfAttachment)
        ORDER BY DATE(DateOfAttachment);
         `);
        return result;
    } catch (err) {
        console.error('Error fetching users', err);
        throw err;
    }
}

module.exports = {
    addVaccine,
    getCountVaccines,
    getCountUnVaccines,
    getMonth,
}
