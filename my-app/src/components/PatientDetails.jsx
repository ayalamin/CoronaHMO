
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../CSS/PatientDetails.css';

const PatientDetails = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const IDm = location.state?.memberId || 35;
    const [MemberID, setMemberID] = useState(null);
    const [FirstName, setFirstName] = useState(null);
    const [LastName, setLastName] = useState(null);
    const [AddressCity, setCity] = useState(null);
    const [AddressStreet, setStreet] = useState(null);
    const [AddressNumber, setBuildingNumber] = useState(null);
    const [Birthdate, setBirthdate] = useState(null);
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
                const response = await fetch(`http://localhost:8080/api/user/${IDm}`);
                const data = await response.json();
                console.log("the data is: ", JSON.stringify(data));
                // JSON.stringify(data)
                setMemberID(data[0].MemberID);
                setFirstName(data[0].FirstName);
                setLastName(data[0].LastName);
                setCity(data[0].AddressCity);
                setStreet(data[0].AddressStreet);
                setBuildingNumber(data[0].AddressNumber);
                setBirthdate(data[0].Birthdate);
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
    }, []);



    const editing = () => {
        const user = {
            FirstName: FirstName,
            LastName: LastName,
            AddressCity: AddressCity,
            AddressStreet: AddressStreet,
            AddressNumber: AddressNumber,
            Birthdate: Birthdate,
            Phone: Phone,
            MobilePhone: MobilePhone,
            Photo: Photo
        };
        editPatientData(user);
    };

    const editPatientData = async (updatedPatientData) => {
        try {
            const response = await fetch(`http://localhost:8080/api/user/${IDm}`, {
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
                        <strong>First Name:</strong> {FirstName}
                    </div>
                    <div className="details">
                        <strong>Last Name:</strong> {LastName}
                    </div>
                    <div className="details">
                        <strong>ID:</strong> {MemberID}
                    </div>
                    <div className="details">
                        <strong>Citi:</strong> {AddressCity}
                    </div>
                    <div className="details">
                        <strong>Street:</strong> {AddressStreet}
                    </div>
                    <div className="details">
                        <strong>BuildingNumber:</strong> {AddressNumber}
                    </div>
                    <div className="details">
                        <strong>Birthdate:</strong> {Birthdate}
                    </div>
                    <div className="details">
                        <strong>Phone:</strong> {Phone}
                    </div>
                    <div className="details">
                        <strong>Mobile Phone:</strong> {MobilePhone}
                    </div>
                    <div className="details">
                        <strong>Checkup Date:</strong> {CheckupDate}
                    </div>
                    <div className="details">
                        <strong>Recovery Date:</strong> {RecoveryDate}
                    </div>
                    <div className="details">
                        <strong>Recovery Date:</strong> {PositiveTestDate}
                    </div>
                    <div className="details">
                        <strong>Profile Picture:</strong> <img src={Photo} alt="Photo" />
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
                    <button type="button" onClick={editing}>Edit</button>
                </>
            )}
        </div>
    );
};

export default PatientDetails;
