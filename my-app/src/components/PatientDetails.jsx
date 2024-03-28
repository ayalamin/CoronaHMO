
import React, { useEffect, useState } from 'react';
import '../CSS/PatientDetails.css';
import { useLocation } from 'react-router-dom';
import DisplayImage from './displayImage'
import AddVaccine from './addVaccine';
import moment from 'moment';

const PatientDetails = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const [isEditing, setIsEditing] = useState(false);


    const ID = location.state;
    const [MemberID, setMemberID] = useState(null);
    const [FirstName, setFirstName] = useState(null);
    const [LastName, setLastName] = useState(null);
    const [AddressCity, setCity] = useState(null);
    const [AddressStreet, setStreet] = useState(null);
    const [AddressNumber, setBuildingNumber] = useState(null);
    const [BirthDate, setBirthDate] = useState(null);
    const [Phone, setPhone] = useState(null);
    const [MobilePhone, setMobilePhone] = useState(null);
    const [RecoveryDate, setRecoveryDate] = useState(null);
    const [Vaccines, setVaccines] = useState(null);
    const [Photo, setPhoto] = useState(null);
    const [PositiveTestDate, setPositiveTestDate] = useState(null);
    const [formattedPositiveTestDate, setformattedPositiveTestDate] = useState(null);
    const [formattedRecoveryDate, setformattedRecoveryDate] = useState(null);
    const [formattedBirthDate, setformattedBirthDate] = useState(null);
    const [ifPTDChange, setifPTDChange] = useState(false);
    const [ifRecoveryDateChange, setifRecoveryDateChange] = useState(false);

    const [showAddVaccine, setShowAddVaccine] = useState(false);
    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/user/${ID}`);
                const data = await response.json();
                setMemberID(data[0].MemberID);
                setFirstName(data[0].FirstName);
                setLastName(data[0].LastName);
                setCity(data[0].AddressCity);
                setStreet(data[0].AddressStreet);
                setBuildingNumber(data[0].AddressNumber);
                if (data[0].BirthDate !== '') {
                    const formattedBirthDate1 = moment(data[0].BirthDate).format("YYYY-MM-DD");
                    setformattedBirthDate(formattedBirthDate1);
                }
                if (data[0].PositiveTestDate !== null) {
                    const formattedPositiveTestDate1 = moment(data[0].PositiveTestDate).format("YYYY-MM-DD");
                    setformattedPositiveTestDate(formattedPositiveTestDate1);
                }
                if (data[0].RecoveryDate !== null) {
                    const formattedRecoveryDate1 = moment(data[0].RecoveryDate).format("YYYY-MM-DD");
                    setformattedRecoveryDate(formattedRecoveryDate1);
                }
                setBirthDate(data[0].BirthDate);
                setPositiveTestDate(data[0].PositiveTestDate);
                setRecoveryDate(data[0].RecoveryDate);
                setPhone(data[0].Phone);
                setMobilePhone(data[0].MobilePhone);
                setVaccines(data[0].vaccines);
                setPhoto(data[0].Photo);
                console.log("the photo is: ");
                console.log( data[0].Photo);

                setIsLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };
        console.log("The Positive Test Date: " + PositiveTestDate);
        fetchPatientData();
        setIsEditing(false);
    }, []);




    const handleEdit = () => {
        setIsEditing(true);
    };

    const addVaccine = async () => {
        setShowAddVaccine(true);
    };

    const editing = () => {
        if (!/^[a-zA-Z]+$/.test(FirstName)) {
            alert("First name must contain only letters.");
            return;
        }
        if (!/^[a-zA-Z]+$/.test(LastName)) {
            alert("Last name must contain only letters.");
            return;
        }
        if (Phone.length < 7 || Phone.length > 9 || !/^\d+$/.test(Phone)) {
            alert("Phone number must contain between 7 and 9 digits.");
            return;
        }
        if (MobilePhone.length !== 10 || !/^\d+$/.test(MobilePhone)) {
            alert("Mobile phone number must contain exactly 10 digits.");
            return;
        }

        const today = new Date();
        const selectedDate = new Date(BirthDate);
        const recoveryDate = new Date(RecoveryDate);
        const positiveTestDate = new Date(PositiveTestDate);
        if (selectedDate > today) {
            alert("Birthdate must be before today's date.");
            return;
        }
        if (recoveryDate > today) {
            alert("recoveryDate must be before today's date.");
            return;
        }
        if (recoveryDate > today) {
            alert("recoveryDate must be before today's date.");
            return;
        }
        if (positiveTestDate > today) {
            alert("positiveTestDate must be before today's date.");
            return;
        }
        setShowAddVaccine(false);
        const user = {
            MemberID: MemberID,
            FirstName: FirstName,
            LastName: LastName,
            AddressCity: AddressCity,
            AddressStreet: AddressStreet,
            AddressNumber: AddressNumber,
            BirthDate: BirthDate,
            Phone: Phone,
            MobilePhone: MobilePhone,
            Photo: Photo,
            PositiveTestDate: PositiveTestDate,
            RecoveryDate: RecoveryDate,
            ifPTDChange: ifPTDChange,
            ifRecoveryDateChange : ifRecoveryDateChange,
        };
        editPatientData(user);
    };

    const editPatientData = async (updatedPatientData) => {
        try {
            const response = await fetch(`http://localhost:8080/api/user/${ID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedPatientData)
            });

            if (!response.ok) {
                throw new Error('Failed to update patient data');
            }
            setIsEditing(false);
            alert("The details have been successfully updated");
        } catch (error) {
            console.error('Error:', error);
        }
        window.location.reload();
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
                                    value={Phone}
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
                                    type="date"
                                    id="BirthDate"
                                    value={formattedBirthDate}
                                    onChange={(e) => setBirthDate(e.target.value)}
                                    readOnly={BirthDate == ''}
                                />
                            </>
                        ) : (
                            <><strong>BirthDate:</strong> {formattedBirthDate}</>
                        )}
                    </div>
                    <div className="details">
                        {isEditing ? (
                            <>
                                <label htmlFor="PositiveTestDate">Positive Test Date:</label>
                                <input
                                    type="date"
                                    id="PositiveTestDate"
                                    value={formattedPositiveTestDate}
                                    onChange={(e) => {
                                        setPositiveTestDate(e.target.value);
                                        setifPTDChange(true);
                                      }}
                                    readOnly={PositiveTestDate !== null}
                                />
                            </>
                        ) : (
                            <>
                                {PositiveTestDate && (
                                    <>
                                        <strong>Positive Test Date:</strong> {formattedPositiveTestDate}
                                    </>
                                )}
                            </>
                        )}
                    </div>
                    <div className="details">
                        {isEditing && PositiveTestDate ? (
                            <>
                                <label htmlFor="RecoveryDate">Recovery Date:</label>
                                <input
                                    type="date"
                                    id="RecoveryDate"
                                    value={formattedRecoveryDate}
                                    onChange={(e) => {
                                        setRecoveryDate(e.target.value);
                                        setifRecoveryDateChange(true);
                                      }}
                                    readOnly={RecoveryDate !== null}
                                />
                            </>
                        ) : (
                            <>    {RecoveryDate && (
                                <><strong>Recovery Date:</strong> {formattedRecoveryDate} </>
                            )}</>
                        )}
                    </div>

                    <div className="details">
                        {isEditing ? (

                            <>
                                {Photo && (
                                    <>
                                        <label htmlFor="ProfilePicture">Profile Picture:</label>
                                        <input
                                            type="text"
                                            id="ProfilePicture"
                                            value={Photo}
                                            onChange={(e) => setPhoto(e.target.value)}
                                        />
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                {Photo && (
                                    <>
                                        <DisplayImage props={Photo.data} />
                                    </>
                                )}
                            </>
                        )}
                    </div>
                    <div>
                        {showAddVaccine && <AddVaccine MemberID={MemberID} />}
                    </div>
                    {Vaccines && Vaccines.manufacturer[0] && (
                        <>
                            <h3>Vaccines</h3>
                            <table className="vaccines-table">
                                <thead>
                                    <tr>
                                        <th>Vaccine Number</th>
                                        <th>Vaccine Date</th>
                                        <th>Manufacturer</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Vaccines.dateReceived.map((date, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{date}</td>
                                            <td>{Vaccines.manufacturer[index]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}
                    <div className="details">
                        {isEditing ? (
                            <>
                                <button type="button" onClick={editing}>finish</button>
                                <button type="button" onClick={addVaccine}>Add a vaccine</button>
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
