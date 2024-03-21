--CREATE TABLE Members (
--    ID INT PRIMARY KEY IDENTITY,
--    MemberID VARCHAR(50) UNIQUE,
--    FirstName VARCHAR(50),
--    LastName VARCHAR(50),
--    AddressCity VARCHAR(100),
--    AddressStreet VARCHAR(100),
--    AddressNumber VARCHAR(20),
--    BirthDate DATE,
--    Phone VARCHAR(20),
--    MobilePhone VARCHAR(20),
--    Photo VARBINARY(MAX)
--);

--CREATE TABLE Vaccinations (
--    ID INT PRIMARY KEY IDENTITY,
--    MemberID VARCHAR(50),
--    DateReceived DATE,
--    Manufacturer VARCHAR(100),
--    FOREIGN KEY (MemberID) REFERENCES Members(MemberID)
--);

--CREATE TABLE CovidCases (
--    ID INT PRIMARY KEY IDENTITY,
--    MemberID VARCHAR(50) UNIQUE,
--    DateOfAttachment DATE,
--    DateOfRecovery DATE,
--    FOREIGN KEY (MemberID) REFERENCES Members(MemberID)
--);



