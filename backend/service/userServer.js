const sql = require('../DB');

async function getAllUser() {
    console.log("in getAllUser in userServer")
    try {
        const result = await sql.query(`
        SELECT ID, FirstName, LastName
        FROM CoronaHMO.Members;
         `);
        return result;
    } catch (err) {
        console.error('Error fetching users', err);
        throw err;
    }
}

async function getUserInformation(pas) {
    console.log("in getttttt the pas is: "+ pas);
    try {
        const data = await sql.query(`
            SELECT 
            Members.*,
            CovidCases.DateOfRecovery AS RecoveryDate,
            CovidCases.DateOfAttachment AS PositiveTestDate,
            Vaccinations.Manufacturer,
            Vaccinations.DateReceived AS VaccinationDate
            FROM 
                Members
            LEFT JOIN 
                CovidCases ON Members.ID = CovidCases.MemberID
            LEFT JOIN 
                Vaccinations ON Members.ID = Vaccinations.MemberID
            WHERE 
                Members.ID = '${pas}'
        `);
        console.log("in get after query the data is:" + data);
        return data;
    } catch (err) {
        console.error('Error fetching users', err);
        throw err;
    }
}

async function addUser(userData) {
    try {
        const formattedBirthDate = new Date(userData.BirthDate).toISOString().slice(0, 10);

        const { MemberID, FirstName, LastName, AddressCity, AddressStreet, AddressNumber, BirthDate, Phone, MobilePhone, Photo } = userData;
        console.log("in adduser in userserver" + BirthDate );
      

        const query = `
            INSERT INTO CoronaHMO.Members (MemberID, FirstName, LastName, AddressCity, AddressStreet, AddressNumber, BirthDate, Phone, MobilePhone, Photo) 
            VALUES ('${MemberID}', '${FirstName}', '${LastName}', '${AddressCity}', '${AddressStreet}', '${AddressNumber}', '${formattedBirthDate}', '${Phone}', '${MobilePhone}', '${Photo}')
        `;

        const result = await sql.query(query);
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
        const formattedBirthDate = new Date(BirthDate).toISOString().slice(0, 10);

        console.log('in update in userserver ' + BirthDate);
        const query = `
            UPDATE CoronaHMO.Members 
            SET 
                FirstName = '${FirstName}',
                LastName = '${LastName}',
                AddressCity = '${AddressCity}',
                AddressStreet = '${AddressStreet}',
                AddressNumber = '${AddressNumber}',
                BirthDate = '${formattedBirthDate}',
                Phone = '${Phone}',
                MobilePhone = '${MobilePhone}',
                Photo = '${Photo}' 
            WHERE ID = ${userId}
        `;

        const result = await sql.query(query);
        console.log('User updated successfully');
        return result;
    } catch (err) {
        console.error('Error updating user', err);
        throw err;
    }
}


async function deleteUser(ID) {
    try {
        console.log('in delete uder id ='+ID);

        const result = await sql.query(`
        DELETE FROM Members 
        WHERE ID = ${ID}
    `);
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
