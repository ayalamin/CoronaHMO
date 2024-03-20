const db = require('./DB');


async function getUserInformation(pas) {
    console.log("in getttttt")
    let data = await db.query(
    `SELECT 
    Members.*,
    CovidCases.RecoveryDate,
    CovidCases.PositiveTestDate,
    Vaccinations.Manufacturer,
    Vaccinations.VaccinationDate
    FROM 
        Members
    LEFT JOIN 
        CovidCases ON Members.ID = CovidCases.MemberID
    LEFT JOIN 
        Vaccinations ON Members.ID = Vaccinations.MemberID; 
     where Members.ID=${pas.id}`);
    return data;
}

async function getAllUser() {
    console.log("in getAllUser in userServer")
    const data = await db.query('select Members.ID, Members.FirstName, Members.LastName from dbo.Members ');
    return data;
}

module.exports = {
    getAllUser,
    getUserInformation,
}
