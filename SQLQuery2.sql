 select * from CoronaHMO.CovidCases
 USE CoronaHMO;

     INSERT INTO CoronaHMO.Members (MemberID, FirstName, LastName, AddressCity, AddressStreet, AddressNumber, BirthDate, Phone, MobilePhone, Photo) 
            VALUES ('35', 'df', 'fg', 'dg', 'dfh', 'dfg', '2024-03-11' , 'fh', 'dhg','');
            
            SELECT 
            Members.*,
            CovidCases.DateOfRecovery AS RecoveryDate,
            CovidCases.DateOfAttachment AS PositiveTestDate,
            Vaccinations.Manufacturer,
            Vaccinations.DateReceived AS VaccinationDate
            FROM 
                Members
            LEFT JOIN 
                CovidCases ON Members.MemberID = CovidCases.MemberID
            LEFT JOIN 
                Vaccinations ON Members.MemberID = Vaccinations.MemberID
            WHERE 
                Members.ID = 26;
        SELECT COUNT(*)
FROM CoronaHMO.Members
WHERE MemberID NOT IN (SELECT DISTINCT MemberID FROM CoronaHMO.Vaccinations);

    SELECT DATE(DateOfAttachment) AS day, COUNT(*) AS active_patients
        FROM CoronaHMO.CovidCases
        WHERE DateOfAttachment BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()
        GROUP BY DATE(DateOfAttachment)
        ORDER BY DATE(DateOfAttachment);