const connectToDatabase = require('./DB');

async function getAllUser() {
    console.log("in getAllUser in userServer")
    try {
        const result = await sql.query('select Members.ID, Members.FirstName, Members.LastName from CoronaHMO.Members ');
        return result.recordset;
    } catch (err) {
        console.error('Error fetching users', err);
        throw err;
    }
}
async function getUserInformation(pas) {
    console.log("in getttttt");
    try {
        const data = await sql.query`SELECT 
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
                Vaccinations ON Members.ID = Vaccinations.MemberID
            WHERE Members.ID = ${pas.id};`;
        return data.recordset;
    } catch (err) {
        console.error('Error fetching users', err);
        throw err;
    }
}

async function addUser(ID,FirstName,LastName,AddressCity,AddressStreet,AddressNumber,BirthDate,Phone,MobilePhone,Photo) {
    try {
        console.log("in adduser in userserver");

        const result = await sql.query`INSERT INTO Members (ID,FirstName,LastName,AddressCity,AddressStreet,AddressNumber,BirthDate,Phone,MobilePhone,Photo) VALUES (${ID}, ${FirstName},${LastName},${AddressCity},${AddressStreet},${AddressNumber},${BirthDate},${Phone},${MobilePhone},${Photo})`;
        console.log('User added successfully');
        return result;
    } catch (err) {
        console.error('Error adding user', err);
        throw err;
    }
}

async function updateUser(userId, userData) {
    const { FirstName, LastName, AddressCity, AddressStreet, AddressNumber, BirthDate, Phone, MobilePhone, Photo } = userData;
    try {
        const result = await sql.query`UPDATE Members SET FirstName = ${FirstName}, LastName = ${LastName}, AddressCity = ${AddressCity}, AddressStreet = ${AddressStreet}, AddressNumber = ${AddressNumber}, BirthDate = ${BirthDate}, Phone = ${Phone}, MobilePhone = ${MobilePhone}, Photo = ${Photo} WHERE ID = ${userId}`;
        console.log('User updated successfully');
        return result;
    } catch (err) {
        console.error('Error updating user', err);
        throw err;
    }
}


async function deleteUser(ID) {
    try {
        const result = await sql.query`DELETE FROM Members WHERE ID = ${ID}`;
        console.log('User deleted successfully');
        return result;
    } catch (err) {
        console.error('Error deleting user', err);
        throw err;
    }
}

module.exports = {
    getAllUser,
    getUserInformation,
    addUser,
    updateUser,
    deleteUser,
}
