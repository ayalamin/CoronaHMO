import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const ViewMembers = ({ }) => {
    let navigate = useNavigate();
    const [names, setnames] = useState(null);
    const {
        id,
        firstName,
        lastName,
    } = names;

    useEffect(() => {
        const fetchnamesData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/user/`);
                const data = await response.json();
                setnames(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchnamesData();
    }, []);

    if (!names) {
        return <div>Loading...</div>;
    }


    const goToDetails = (id) => {
        navigate(`/PatientDetails/${id}`);
    };

    const deletePatientData = async (ID) => {
        try {
            const response = await fetch(`http://localhost:3000/api/user/${ID}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete patient data');
            }
            console.log('Patient data deleted successfully!');
            alert('Patient data deleted successfully!');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2 >HMO members</h2>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th></th> {/* תיאור הכפתור */}
                    </tr>
                </thead>
                <tbody>
                    {names.map((name, index) => (
                        <tr key={index}>
                            <td>{name.firstName}</td>
                            <td>{name.lastName}</td>
                            <td><button onClick={() => goToDetails(name.id)}>פרטים</button></td>
                            <td><button onClick={() => deletePatientData(name.id)}>מחיקה</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewMembers;
