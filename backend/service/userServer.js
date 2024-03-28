const sql = require('../DB');

async function getAllUser() {
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
    try {
        const data = await sql.query(`
            SELECT 
            Members.*,
            CovidCases.DateOfRecovery AS RecoveryDate,
            CovidCases.DateOfAttachment AS PositiveTestDate,
            JSON_OBJECT(
                'manufacturer', JSON_ARRAYAGG(Vaccinations.Manufacturer),
                'dateReceived', JSON_ARRAYAGG(Vaccinations.DateReceived)
            ) AS vaccines
        FROM 
            CoronaHMO.Members
        LEFT JOIN 
            CovidCases ON Members.MemberID = CovidCases.MemberID
        LEFT JOIN 
            Vaccinations ON Members.MemberID = Vaccinations.MemberID
        WHERE 
            Members.ID = '${pas}'
        GROUP BY
            Members.MemberID;
        `);
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
        const existingUserQuery = `SELECT 1 FROM CoronaHMO.Members WHERE MemberID = '${MemberID}'`;
        const existingUserResult = await sql.query(existingUserQuery);
        if (existingUserResult.length > 0) {
            return { error: 'User already exists.' };
        }
        const query = `
        INSERT INTO CoronaHMO.Members (MemberID, FirstName, LastName, AddressCity, AddressStreet, AddressNumber, BirthDate, Phone, MobilePhone, Photo) 
        VALUES ( '${MemberID}', '${FirstName}', '${LastName}', '${AddressCity}', '${AddressStreet}', '${AddressNumber}', '${formattedBirthDate}', '${Phone}', '${MobilePhone}', '${Photo}')
        `;
        const result = await sql.query(query);
        return result;
    } catch (err) {
        console.error('Error adding user', err);
        throw err;
    }
}

async function updateUser(userId, userData) {
    const { MemberID, FirstName, LastName, AddressCity, AddressStreet, AddressNumber, BirthDate, Phone, MobilePhone, Photo, PositiveTestDate, RecoveryDate, ifPTDChange, ifRecoveryDateChange } = userData;
    try {
        const formattedBirthDate = new Date(BirthDate).toISOString().slice(0, 10);
        let query = `
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
        if (ifPTDChange) {
            if (ifRecoveryDateChange) {
                query = `
                    INSERT INTO CoronaHMO.CovidCases (MemberID, DateOfAttachment, DateOfRecovery)
                    SELECT '${MemberID}', '${PositiveTestDate}', '${RecoveryDate}'
                    WHERE NOT EXISTS (
                    SELECT 1
                    FROM CoronaHMO.CovidCases
                    WHERE MemberID = '${MemberID}'
                    )
                `;
            }
            else {
                query = `
                    INSERT INTO CoronaHMO.CovidCases (MemberID, DateOfAttachment)
                    SELECT '${MemberID}', '${PositiveTestDate}'
                    WHERE NOT EXISTS (
                    SELECT 1
                    FROM CoronaHMO.CovidCases
                    WHERE MemberID = '${MemberID}'
                    )
                `;
            }
            await sql.query(query);
        }
        else {
            if(ifRecoveryDateChange)
            {
                query = `          
                UPDATE CoronaHMO.CovidCases 
                SET 
                DateOfRecovery = '${RecoveryDate}'
                WHERE MemberID = ${MemberID} 
                AND EXISTS (
                    SELECT 1
                    FROM (
                        SELECT *
                        FROM CoronaHMO.CovidCases
                    ) AS c
                    WHERE c.MemberID = '${MemberID}'
                    )
            `;
            }
        }
        await sql.query(query);
        return result;
    } catch (err) {
        console.error('Error updating user', err);
        throw err;
    }
}


async function deleteUser(ID) {
    try {
        console.log('in delete uder id =' + ID);
        await sql.query(`
        DELETE FROM Vaccinations
        WHERE MemberID = (SELECT MemberID FROM Members WHERE ID = ${ID})
        `);
        await sql.query(`
        DELETE FROM CovidCases
        WHERE MemberID = (SELECT MemberID FROM Members WHERE ID = ${ID})
        `);
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
