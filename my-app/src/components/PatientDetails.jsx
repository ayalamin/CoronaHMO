
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../CSS/PatientDetails.css';
import { useParams } from 'react-router-dom';


const PatientDetails = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const [isEditing, setIsEditing] = useState(false);

    // const { name } = location.state || {};
    // const { ID } = name || {};
    const memberId = location.state;
    console.log("the state is: " + location.state)
    console.log("the member Id is: " + memberId)
    const [MemberID, setMemberID] = useState(null);
    const [FirstName, setFirstName] = useState(null);
    const [LastName, setLastName] = useState(null);
    const [AddressCity, setCity] = useState(null);
    const [AddressStreet, setStreet] = useState(null);
    const [AddressNumber, setBuildingNumber] = useState(null);
    const [BirthDate, setBirthDate] = useState(null);
    const [Phone, setPhone] = useState(null);
    const [MobilePhone, setMobilePhone] = useState(null);
    const [CheckupDate, setCheckupDate] = useState(null);
    const [RecoveryDate, setRecoveryDate] = useState(null);
    const [Vaccines, setVaccines] = useState(null);
    const [Photo, setPhoto] = useState(null);
    const [PositiveTestDate, setPositiveTestDate] = useState(null);


    // Manufacturer
    // VaccinationDate
    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/user/${memberId}`);
                const data = await response.json();
                console.log("the data is: ", JSON.stringify(data));
                // JSON.stringify(data)
                setMemberID(data[0].MemberID);
                setFirstName(data[0].FirstName);
                setLastName(data[0].LastName);
                setCity(data[0].AddressCity);
                setStreet(data[0].AddressStreet);
                setBuildingNumber(data[0].AddressNumber);
                setBirthDate(data[0].BirthDate);
                setPhone(data[0].Phone);
                setMobilePhone(data[0].MobilePhone);
                setCheckupDate(data[0].CheckupDate);
                setRecoveryDate(data[0].RecoveryDate);
                setVaccines(data[0].Vaccines);
                setPhoto(data[0].Photo);
                setPositiveTestDate(data[0].PositiveTestDate);
                setIsLoading(false);
                console.log("the FirstName is: ", data.FirstName);

                // setPatient(data);
            } catch (error) {
                console.error('Error:', error);
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPatientData();
        setIsEditing(false);
    }, []);

    const handleEdit = () => {
        debugger
        console.log("in handleEdit")
        setIsEditing(true);
    };

    const edit = () => {
        console.log("in edit")
        //     setIsEditing(true);
    }

    const editing = () => {
        const user = {
            FirstName: FirstName,
            LastName: LastName,
            AddressCity: AddressCity,
            AddressStreet: AddressStreet,
            AddressNumber: AddressNumber,
            BirthDate: BirthDate,
            Phone: Phone,
            MobilePhone: MobilePhone,
            Photo: Photo
        };
        editPatientData(user);
    };

    const editPatientData = async (updatedPatientData) => {
        try {
            const response = await fetch(`http://localhost:8080/api/user/${memberId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedPatientData)
            });

            if (!response.ok) {
                throw new Error('Failed to update patient data');
            }
            console.log('Patient data updated successfully!');
            setIsEditing(false);
            alert("The details have been successfully updated");
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="patient-details">
            {isLoading ? (<div>Loading...</div>
            ) : error ? (
                <div>Error fetching data: {error.message}</div>
            ) : (
                <>
                    <h2>Patient Details</h2>
                    <div className="details">
                        <div className="details">
                            <strong>ID:</strong> {MemberID}
                        </div>
                        {isEditing ? (
                            <>
                                <label htmlFor="FirstName">First Name:</label>
                                <input
                                    type="text"
                                    id="FirstName"
                                    value={FirstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </>
                        ) : (
                            <><strong>First Name:</strong> {FirstName}</>
                        )}
                    </div>
                    <div className="details">
                        {isEditing ? (
                            <>
                                <label htmlFor="LastName">Last Name:</label>
                                <input
                                    type="text"
                                    id="LastName"
                                    value={LastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </>
                        ) : (
                            <><strong>Last Name:</strong> {LastName}</>
                        )}

                    </div>
                    <div className="details">
                        {isEditing ? (
                            <>
                                <label htmlFor="Citi">Citi:</label>
                                <input
                                    type="text"
                                    id="Citi"
                                    value={AddressCity}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </>
                        ) : (
                            <><strong>Citi:</strong> {AddressCity}</>
                        )}
                    </div>
                    <div className="details">
                        {isEditing ? (
                            <>
                                <label htmlFor="Street">Street:</label>
                                <input
                                    type="text"
                                    id="Street"
                                    value={AddressStreet}
                                    onChange={(e) => setStreet(e.target.value)}
                                />
                            </>
                        ) : (
                            <><strong>Street:</strong> {AddressStreet}</>
                        )}
                    </div>
                    <div className="details">
                        {isEditing ? (
                            <>
                                <label htmlFor="BuildingNumber">BuildingNumber:</label>
                                <input
                                    type="text"
                                    id="Building Number"
                                    value={AddressNumber}
                                    onChange={(e) => setBuildingNumber(e.target.value)}
                                />
                            </>
                        ) : (
                            <><strong>Building Number:</strong> {AddressNumber}</>
                        )}
                    </div>
                    <div className="details">
                        {isEditing ? (
                            <>
                                <label htmlFor="Phone">Phone:</label>
                                <input
                                    type="text"
                                    id="Phone"
                                    value={BirthDate}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </>
                        ) : (
                            <><strong>Phone:</strong> {Phone}</>
                        )}
                    </div>
                    <div className="details">
                        {isEditing ? (
                            <>
                                <label htmlFor="MobilePhone">Mobile Phone:</label>
                                <input
                                    type="text"
                                    id="MobilePhone"
                                    value={MobilePhone}
                                    onChange={(e) => setMobilePhone(e.target.value)}
                                />
                            </>
                        ) : (
                            <><strong>Mobile Phone:</strong> {MobilePhone}</>
                        )}
                    </div>
                    <div className="details">
                        {isEditing ? (
                            <>
                                <label htmlFor="BirthDate">BirthDate:</label>
                                <input
                                    type="text"
                                    id="BirthDate"
                                    value={BirthDate}
                                    onChange={(e) => setBirthDate(e.target.value)}
                                />
                            </>
                        ) : (
                            <><strong>BirthDate:</strong> {BirthDate}</>
                        )}
                    </div>

                    <div className="details">
                        {isEditing ? (
                            <>
                                <label htmlFor="CheckupDate">Checkup Date:</label>
                                <input
                                    type="text"
                                    id="CheckupDate"
                                    value={CheckupDate}
                                    onChange={(e) => setCheckupDate(e.target.value)}
                                />
                            </>
                        ) : (
                            <> <strong>Checkup Date:</strong> {CheckupDate}</>
                        )}
                    </div>
                    <div className="details">
                        {isEditing ? (
                            <>
                                <label htmlFor="RecoveryDate">Recovery Date:</label>
                                <input
                                    type="text"
                                    id="RecoveryDate"
                                    value={RecoveryDate}
                                    onChange={(e) => setRecoveryDate(e.target.value)}
                                />
                            </>
                        ) : (
                            <>  <strong>Recovery Date:</strong> {RecoveryDate}</>
                        )}
                    </div>
                    <div className="details">
                        {isEditing ? (
                            <>
                                <label htmlFor="PositiveTestDate">Positive Test Date:</label>
                                <input
                                    type="text"
                                    id="PositiveTestDate"
                                    value={PositiveTestDate}
                                    onChange={(e) => setPositiveTestDate(e.target.value)}
                                />
                            </>
                        ) : (
                            <> <strong>Positive Test Date:</strong> {PositiveTestDate}</>
                        )}
                    </div>
                    <div className="details">
                        {isEditing ? (
                            <>
                                <label htmlFor="ProfilePicture">Profile Picture:</label>
                                <input
                                    type="text"
                                    id="ProfilePicture"
                                    value={Photo}
                                    onChange={(e) => setCheckupDate(e.target.value)}
                                />
                            </>
                        ) : (
                            <> <strong>Profile Picture:</strong> <img src={Photo} alt="Photo" /></>
                        )}
                    </div>

                    {/* <h3>Vaccines</h3>
                    <table className="vaccines-table">
                        <thead>
                            <tr>
                                <th>Vaccine Number</th>
                                <th>Vaccine Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Vaccines.map((vaccine, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{vaccine.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table> */}
                    <div className="details">
                        {isEditing ? (
                            <>
                            <button type="button" onClick={editing}>finish</button>
                            </>
                        ) : (
                            <>
                            <button type="button" onClick={handleEdit}>Edit</button>
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default PatientDetails;
