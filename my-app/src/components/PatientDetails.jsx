import React, { useEffect, useState } from 'react';

const PatientDetails = async (props) => {

    const [patient, setPatient] = useState(null);

    const {
        firstName,
        lastName,
        id,
        address,
        birthdate,
        phone,
        mobilePhone,
        CheckupDate,
        recoveryDate,
        vaccines,
        profilePicture
    } = patient;

    const { ID } = props;

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/user/${ID}`);
                const data = await response.json();
                setPatient(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchPatientData();
    }, [ID]);

    if (!patient) {
        return <div>Loading...</div>;
    }

    const editing = () => {
        const user = {////לבדוק שבאמת הפרטים הם המעודכנים
            firstName: firstName,
            lastName: lastName,
            id: id,
            address: address,
            birthdate: birthdate,
            phone: phone,
            mobilePhone: mobilePhone,
            profilePicture: profilePicture
        };

        console.log(user);
        editPatientData(user)
    };

    const editPatientData = async (updatedPatientData) => {
        try {
            const response = await fetch(`http://localhost:3000/api/user/${ID}`, {
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
            <h2>Patient Details</h2>
            <div>
                <strong>First Name:</strong> {firstName}
            </div>
            <div>
                <strong>Last Name:</strong> {lastName}
            </div>
            <div>
                <strong>ID:</strong> {id}
            </div>
            <div>
                <strong>Address:</strong> {address}
            </div>
            <div>
                <strong>Birthdate:</strong> {birthdate}
            </div>
            <div>
                <strong>Phone:</strong> {phone}
            </div>
            <div>
                <strong>Mobile Phone:</strong> {mobilePhone}
            </div>
            <div>
                <strong>Checkup Date:</strong> {CheckupDate}
            </div>
            <div>
                <strong>Recovery Date:</strong> {recoveryDate}
            </div>
            <div>
                <strong>Profile Picture:</strong> <img src={profilePicture} alt="Profile Picture" />
            </div>
            <h3>Vaccines</h3>
            <table>
                <thead>
                    <tr>
                        <th>Vaccine Number</th>
                        <th>Vaccine Date</th>
                    </tr>
                </thead>
                <tbody>
                    {vaccines.map((vaccine, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{vaccine.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button type="submit" onClick={editing}>edit</button>
        </div>
    );
};

export default PatientDetails;