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

async function getCountVaccines(pas) {
    console.log("in getCountVaccines in userServer")
    try {
        const result = await sql.query(`
        SELECT COUNT(*) AS VaccineCount
        FROM CoronaHMO.Vaccinations
        WHERE MemberID = '${pas}';
         `);
        console.log("in getCountVaccines afterr" + result)

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
        console.log("in getCountUnVaccines afterr" + result)

        return result;
    } catch (err) {
        console.error('Error fetching users', err);
        throw err;
    }
}

async function getMonth() {
    console.log("in getMonth in userServer")
    try {
        const result = await sql.query(`
        SELECT DATE(DateOfAttachment) AS day, COUNT(*) AS active_patients
        FROM CoronaHMO.CovidCases
        WHERE DateOfAttachment BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()
        GROUP BY DATE(DateOfAttachment)
        ORDER BY DATE(DateOfAttachment);
         `);
        console.log("in getMonth in userserver" + result)
        return result;
    } catch (err) {
        console.error('Error fetching users', err);
        throw err;
    }
}

async function getUserInformation(pas) {
    console.log("in getttttt the pas is: " + pas);
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
        console.log("in adduser in userserver" + BirthDate);


        const query = `
        INSERT INTO CoronaHMO.Members (MemberID, FirstName, LastName, AddressCity, AddressStreet, AddressNumber, BirthDate, Phone, MobilePhone, Photo) 
SELECT '${MemberID}', '${FirstName}', '${LastName}', '${AddressCity}', '${AddressStreet}', '${AddressNumber}', '${formattedBirthDate}', '${Phone}', '${MobilePhone}', '${Photo}'
FROM DUAL
WHERE NOT EXISTS (
    SELECT 1
    FROM CoronaHMO.Members
    WHERE MemberID = '${MemberID}'
)
        `;

        const result = await sql.query(query);
        console.log('User added successfully');
        return result;
    } catch (err) {
        console.error('Error adding user', err);
        throw err;
    }
}

async function addVaccine(vaccineData) {
    try {
        const { MemberID, DateReceived, Manufacturer } = vaccineData;
        const formattedBirthDate = new Date(vaccineData.DateReceived).toISOString().slice(0, 10);


        console.log("in addVaccine in userserver");
        const query = `
            INSERT INTO CoronaHMO.Vaccinations (MemberID, DateReceived, Manufacturer) 
            VALUES ('${MemberID}',  '${formattedBirthDate}', '${Manufacturer}')
        `;
        const result = await sql.query(query);
        console.log('vaccine added successfully');
        return result;
    } catch (err) {
        console.error('Error adding vaccine', err);
        throw err;
    }
}


async function updateUser(userId, userData) {
    const { MemberID, FirstName, LastName, AddressCity, AddressStreet, AddressNumber, BirthDate, Phone, MobilePhone, Photo, PositiveTestDate, RecoveryDate } = userData;
    try {
        const formattedBirthDate = new Date(BirthDate).toISOString().slice(0, 10);

        console.log('in update in userserver ' + PositiveTestDate);
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
        console.log('User updated successfully');
        // const formattedDateOfAttachment = new Date(PositiveTestDate).toISOString().slice(0, 10);
        // const formattedRecoveryDate = new Date(RecoveryDate).toISOString().slice(0, 10);
        console.log("in updeat covidcase: " + MemberID)
        if (PositiveTestDate) {
            if (RecoveryDate) {
                console.log("in updeat covidcase RecoveryDate: "+ RecoveryDate)
                query = `
                INSERT INTO CoronaHMO.CovidCases (MemberID, DateOfAttachment, DateOfRecovery)
                SELECT '${MemberID}', '${PositiveTestDate}', '${RecoveryDate}'
                WHERE NOT EXISTS (
                SELECT 1
                FROM CoronaHMO.CovidCases
                WHERE MemberID = '${MemberID}'
                )
            `;
            
            query1 = `          
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
            else {
                console.log("in updeat covidcase PositiveTestDate: "+ PositiveTestDate)
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
            await sql.query(query1);
            console.log('covidCases inserted successfully');
        }
        return result;
    } catch (err) {
        console.error('Error updating user', err);
        throw err;
    }
}


async function deleteUser(ID) {
    try {
        console.log('in delete uder id =' + ID);
        const result2 = await sql.query(`
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
    addVaccine,
    getCountVaccines,
    getCountUnVaccines,
    getMonth,
}
