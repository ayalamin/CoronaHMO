const db = require('./DB');


async function getUserInformation(pas) {
    console.log("in getttttt")
    let data = await db.query(
        `SELECT * FROM dbo.Members 
    where id=${pas.id}`);
    return data;
}

async function getAllUser() {
    console.log("jiiiiiiiiiiii")
    const data = await db.query('select * from dbo.Members ');
    return data;
}

module.exports = {
    getAllUser,
    getUserInformation,
}
